
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Download, X } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as pdfjs from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import './PassportCertificate.css';

const CERTIFICATE_URL = '/certificate-template.pdf';
const PAGE_WIDTH = 842.04;
const PAGE_HEIGHT = 594.96;

/*
 * PREVIEW COORDINATES
 *
 * DO NOT CHANGE THESE.
 * These control the certificate shown inside the website.
 */
const FIELD_POINTS = {
  name: {
    x: 421.02,
    y: 303,
    align: 'center',
    size: 34,
  },

  grade: {
    x: 456,
    y: 271.051,
    align: 'left',
    size: 13,
  },

  journeyPoints: {
    x: 625,
    y: 190,
    align: 'left',
    size: 15.5,
  },

  passportScore: {
    x: 770,
    y: 190.92,
    align: 'left',
    size: 12.5,
  },

  completedAt: {
    x: 141,
    y: 36,
    align: 'left',
    size: 12,
  },
};

/*
 * DOWNLOAD-ONLY COORDINATES
 *
 * These control ONLY the downloaded PDF.
 * Changing these will NOT affect the website preview.
 */
const DOWNLOAD_FIELD_POINTS = {
  name: {
    x: 421.02,
    y: 303,
    size: 34,
  },

  grade: {
    x: 456,
    y: 273.6,
    size: 13,
  },

  journeyPoints: {
    x: 632,
    y: 190,
    size: 15.5,
  },

  completedAt: {
    x: 141,
    y: 37.7,
    size: 12,
  },
};

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

let certificatePagePromise;

function loadCertificatePage() {
  if (!certificatePagePromise) {
    certificatePagePromise = pdfjs
      .getDocument({ url: CERTIFICATE_URL })
      .promise
      .then(document => document.getPage(1));
  }

  return certificatePagePromise;
}

const formatDate = value =>
  value
    ? new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(new Date(value))
    : '';

const safeFilename = name =>
  (name || 'Explorer')
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'Explorer';

function TextField({ name, value }) {
  const field = FIELD_POINTS[name];
  const fieldRef = useRef(null);
  const [nameScale, setNameScale] = useState(1);

  const baselineFromTop =
    ((PAGE_HEIGHT - field.y) / PAGE_HEIGHT) * 100;

  const x = (field.x / PAGE_WIDTH) * 100;

  useLayoutEffect(() => {
    if (name !== 'name' || !fieldRef.current) {
      return undefined;
    }

    const element = fieldRef.current;

    const fitName = () => {
      setNameScale(
        element.scrollWidth > element.clientWidth
          ? element.clientWidth / element.scrollWidth
          : 1,
      );
    };

    fitName();

    const observer = new ResizeObserver(fitName);
    observer.observe(element);

    return () => observer.disconnect();
  }, [name, value]);

  return (
    <span
      ref={fieldRef}
      className={`certificate-dynamic-field certificate-field-${name}`}
      style={{
        left: `${x}%`,
        top: `${baselineFromTop}%`,
        '--name-scale': name === 'name' ? nameScale : 1,
      }}
      aria-label={`${name}: ${value}`}
    >
      {value}
    </span>
  );
}

function DynamicFields({
  profile,
  stamps,
  points,
  completedAt,
}) {
  return (
    <div
      className="certificate-dynamic-overlay"
      aria-label="Personalized certificate details"
    >
      <TextField
        name="name"
        value={profile.name || ''}
      />

      <TextField
        name="grade"
        value={profile.grade || 'N/A'}
      />

      <TextField
        name="journeyPoints"
        value={points}
      />

      <TextField
        name="completedAt"
        value={formatDate(completedAt)}
      />
    </div>
  );
}

function CertificateSurface({
  profile,
  stamps,
  points,
  completedAt,
  onReady,
}) {
  const surfaceRef = useRef(null);
  const canvasRef = useRef(null);

  const [page, setPage] = useState(null);
  const [surfaceWidth, setSurfaceWidth] = useState(0);
  const [loadError, setLoadError] = useState('');

  /*
   * Load the shared/cached PDF page.
   */
  useEffect(() => {
    let disposed = false;

    loadCertificatePage()
      .then(pdfPage => {
        if (!disposed) {
          setPage(pdfPage);
          onReady(true);
        }
      })
      .catch(() => {
        if (!disposed) {
          setLoadError(
            'The certificate template could not be loaded.',
          );
          onReady(false);
        }
      });

    return () => {
      disposed = true;
    };
  }, [onReady]);

  /*
   * Measure the certificate surface.
   */
  useEffect(() => {
    const element = surfaceRef.current;

    if (!element) {
      return undefined;
    }

    const updateWidth = () => {
      setSurfaceWidth(element.clientWidth);
    };

    updateWidth();

    const observer = new ResizeObserver(() => {
      updateWidth();
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
   * Render the PDF template.
   */
  useEffect(() => {
    if (
      !page ||
      !canvasRef.current ||
      !surfaceWidth
    ) {
      return undefined;
    }

    const canvas = canvasRef.current;

    const scale =
      surfaceWidth / PAGE_WIDTH;

    const viewport =
      page.getViewport({ scale });

    const pixelRatio = Math.min(
      window.devicePixelRatio || 1,
      1.5,
    );

    canvas.width = Math.ceil(
      viewport.width * pixelRatio,
    );

    canvas.height = Math.ceil(
      viewport.height * pixelRatio,
    );

    canvas.style.width =
      `${viewport.width}px`;

    canvas.style.height =
      `${viewport.height}px`;

    const context =
      canvas.getContext('2d');

    if (!context) {
      setLoadError(
        'The certificate preview could not be rendered.',
      );

      return undefined;
    }

    context.setTransform(
      pixelRatio,
      0,
      0,
      pixelRatio,
      0,
      0,
    );

    const renderTask = page.render({
      canvasContext: context,
      viewport,
    });

    renderTask.promise.catch(error => {
      if (
        error?.name !==
        'RenderingCancelledException'
      ) {
        setLoadError(
          'The certificate preview could not be rendered.',
        );
      }
    });

    return () => {
      renderTask.cancel();
    };
  }, [page, surfaceWidth]);

  return (
    <div
      className="certificate-surface"
      ref={surfaceRef}
      aria-label="A4 landscape certificate preview"
    >
      <canvas
        className="certificate-template-canvas"
        ref={canvasRef}
        aria-hidden="true"
      />

      {page && (
        <DynamicFields
          profile={profile}
          stamps={stamps}
          points={points}
          completedAt={completedAt}
        />
      )}

      {!page && !loadError && (
        <span
          className="certificate-template-status"
          role="status"
        >
          Loading certificate…
        </span>
      )}

      {loadError && (
        <span
          className="certificate-template-error"
          role="alert"
        >
          {loadError}
        </span>
      )}
    </div>
  );
}

function fitTextSize(
  font,
  text,
  initialSize,
  maxWidth,
) {
  let size = initialSize;

  while (
    size > 10 &&
    font.widthOfTextAtSize(
      text,
      size,
    ) > maxWidth
  ) {
    size -= 0.5;
  }

  return size;
}

/*
 * DOWNLOAD PDF
 *
 * This is completely separate from the preview.
 * It uses DOWNLOAD_FIELD_POINTS so download adjustments
 * cannot move anything on the website preview.
 */
async function createCertificatePdf({
  profile,
  stamps,
  points,
  completedAt,
}) {
  const response =
    await fetch(CERTIFICATE_URL);

  if (!response.ok) {
    throw new Error(
      `Certificate template returned ${response.status}`,
    );
  }

  const pdfDocument =
    await PDFDocument.load(
      await response.arrayBuffer(),
    );

  const page =
    pdfDocument.getPage(0);

  /*
   * Fonts for the downloaded PDF.
   */
  const times =
    await pdfDocument.embedFont(
      StandardFonts.TimesRoman,
    );

  const helvetica =
    await pdfDocument.embedFont(
      StandardFonts.Helvetica,
    );

  const bold =
    await pdfDocument.embedFont(
      StandardFonts.TimesRomanBold,
    );

  /*
   * Colours matching the current certificate preview.
   */
  const darkInk = rgb(
    16 / 255,
    41 / 255,
    69 / 255,
  );

  const classGray = rgb(
    111 / 255,
    120 / 255,
    132 / 255,
  );

  const gold = rgb(
    207 / 255,
    147 / 255,
    79 / 255,
  );

  /*
   * NAME
   */
  const name =
    (profile.name || '').trim();

  if (name) {
    const nameSize =
      fitTextSize(
        times,
        name,
        DOWNLOAD_FIELD_POINTS.name.size,
        330,
      );

    page.drawText(name, {
      x:
        DOWNLOAD_FIELD_POINTS.name.x -
        times.widthOfTextAtSize(
          name,
          nameSize,
        ) / 2,

      y:
        DOWNLOAD_FIELD_POINTS.name.y,

      size:
        nameSize,

      font: times,

      color: darkInk,
    });
  }

  /*
   * CLASS
   *
   * Blank class displays as N/A,
   * matching the website preview.
   */
  const grade =
    profile.grade || 'N/A';

  page.drawText(grade, {
    x:
      DOWNLOAD_FIELD_POINTS.grade.x,

    y:
      DOWNLOAD_FIELD_POINTS.grade.y,

    size:
      DOWNLOAD_FIELD_POINTS.grade.size,

    font: helvetica,

    color: classGray,
  });

  /*
   * JOURNEY POINTS
   *
   * Number only — no "pts".
   */
  const journeyText =
    `${points}`;

  page.drawText(journeyText, {
    x:
      DOWNLOAD_FIELD_POINTS.journeyPoints.x,

    y:
      DOWNLOAD_FIELD_POINTS.journeyPoints.y,

    size:
      DOWNLOAD_FIELD_POINTS.journeyPoints.size,

    font: bold,

    color: gold,
  });

  /*
   * PASSPORT SCORE NUMBER
   *
   * Intentionally NOT drawn.
   *
   * The "Passport Score" label remains part
   * of the fixed certificate-template PDF.
   *
   * Stamps are also untouched.
   */

  /*
   * COMPLETION DATE
   */
  const date =
    formatDate(completedAt);

  page.drawText(date, {
    x:
      DOWNLOAD_FIELD_POINTS.completedAt.x,

    y:
      DOWNLOAD_FIELD_POINTS.completedAt.y,

    size:
      DOWNLOAD_FIELD_POINTS.completedAt.size,

    font: times,

    color: darkInk,
  });

  return pdfDocument.save();
}

export default function RihlaCertificatePreview({
  open,
  onClose,
  profile,
  stamps,
  points,
  completedAt,
}) {
  const [downloadError, setDownloadError] =
    useState('');

  const [downloading, setDownloading] =
    useState(false);

  const [templateReady, setTemplateReady] =
    useState(false);

  /*
   * PRELOAD THE CERTIFICATE.
   */
  useEffect(() => {
    loadCertificatePage().catch(() => {
      // CertificateSurface handles the visible error.
    });
  }, []);

  /*
   * CLOSE WITH ESCAPE.
   */
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const closeOnEscape =
      event => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

    document.addEventListener(
      'keydown',
      closeOnEscape,
    );

    return () =>
      document.removeEventListener(
        'keydown',
        closeOnEscape,
      );
  }, [open, onClose]);

  /*
   * DOWNLOAD PDF
   */
  const downloadCertificate =
    useCallback(
      async () => {
        setDownloading(true);
        setDownloadError('');

        try {
          const pdfBytes =
            await createCertificatePdf({
              profile,
              stamps,
              points,
              completedAt,
            });

          const blob =
            new Blob(
              [pdfBytes],
              {
                type: 'application/pdf',
              },
            );

          const url =
            URL.createObjectURL(blob);

          const anchor =
            document.createElement('a');

          anchor.href = url;

          anchor.download =
            `Rihla-Certificate-${safeFilename(
              profile.name,
            )}.pdf`;

          document.body.appendChild(
            anchor,
          );

          anchor.click();

          anchor.remove();

          window.setTimeout(
            () =>
              URL.revokeObjectURL(url),
            1000,
          );
        } catch {
          setDownloadError(
            'The certificate PDF could not be generated. Please try again.',
          );
        } finally {
          setDownloading(false);
        }
      },
      [
        completedAt,
        points,
        profile,
        stamps,
      ],
    );

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      className="certificate-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-preview-title"
      onMouseDown={event => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="certificate-modal-panel">
        <header className="certificate-modal-header">
          <h2 id="certificate-preview-title">
            Rihla Certificate
          </h2>

          <div className="certificate-modal-actions">
            <button
              type="button"
              className="rihla-secondary certificate-download-button"
              onClick={downloadCertificate}
              disabled={downloading}
            >
              <Download
                size={17}
                aria-hidden="true"
              />

              {downloading
                ? 'Preparing PDF…'
                : 'Download PDF'}
            </button>

            <button
              type="button"
              className="certificate-close"
              aria-label="Close certificate preview"
              onClick={onClose}
            >
              <X
                size={20}
                aria-hidden="true"
              />
            </button>
          </div>
        </header>

        {downloadError && (
          <p
            className="certificate-download-error"
            role="alert"
          >
            {downloadError}
          </p>
        )}

        <div className="certificate-paper print-certificate-only">
          <CertificateSurface
            profile={profile}
            stamps={stamps}
            points={points}
            completedAt={completedAt}
            onReady={setTemplateReady}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}

