import { Link } from 'react-router-dom';

export default function Footer() {
  const team = [
    ' Laiba Imran',
    'Ankita Ghosh',
    'Athira Olikkoor Raji',
    'Shruthika Meinathan','Abhirami Pradeep','Anna Tresa Vipin'
  ];

  return (
    <footer className="border-t border-[#1A3355] bg-[#050E1D] px-5 py-8">
      <div className="mx-auto max-w-7xl">

        {/* Main footer */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

          {/* Logo */}
<Link to="/" className="flex items-center gap-2">
  <img
    src="/rihla_logo.png"
    alt="Rihla logo"
    className="h-9 w-9 object-contain"
  />

  <span className="font-display text-xl font-bold text-[#F5F0E8]">
    Rihla <span className="text-[#C8965A]">رحلة</span>
  </span>
</Link>

          {/* Copyright */}
          <p className="text-sm text-[#8FA3BF]">
            © 2026 · United Arab Emirates
          </p>

          {/* Team */}
          <div className="flex flex-wrap justify-center items-center text-xs text-[#8FA3BF]">
            <span className="mr-2 text-[#C8965A]">Created by</span>

            {team.map((member, index) => (
              <span key={member}>
                {member}
                {index < team.length - 1 && (
                  <span className="mx-2 text-[#52647D]">·</span>
                )}
              </span>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
}