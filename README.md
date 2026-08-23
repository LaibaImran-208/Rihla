# Rihla — A Journey Through the Emirates

**Rihla (رحلة)** is an interactive educational website designed to help users explore the **United Arab Emirates** through its culture, heritage, landmarks, values, sustainability initiatives, history, and national identity.

Instead of presenting information as a traditional static website, Rihla turns learning about the UAE into an interactive journey where users can explore the seven emirates, complete challenges, take quizzes, collect passport stamps, and track their progress.

## Features

### 🇦🇪 Explore the Emirates

Discover all seven emirates of the UAE through interactive exploration pages featuring:

* Major landmarks and destinations
* Heritage and cultural sites
* Local traditions
* Interesting facts
* Emirate-specific information

### UAE Culture & Heritage

Learn about the traditions and cultural identity of the UAE through dedicated sections covering:

* Cultural heritage
* Traditional practices
* National values
* Emirati identity

### Sustainability

Explore the UAE's sustainability efforts and environmental initiatives, including information about conservation and the country's vision for a sustainable future.

### Historical Timeline

Follow important events in UAE history through an interactive timeline, from the country's early history to the formation and development of the United Arab Emirates.

### Digital Passport

The Digital Passport records the user's progress throughout their journey.

Users can track:

* Places explored
* Points earned
* Quizzes completed
* Emirate stamps collected

Completing all seven emirates unlocks an achievement certificate.

### Challenges & Quizzes

Interactive challenges and quizzes encourage users to test what they have learned while exploring the website.

### Cultural Calendar

Explore important UAE festivals, celebrations, and cultural occasions through a dedicated calendar with countdown features.

### Responsive Design

The website is designed to work across desktop, tablet, and mobile screen sizes, with a responsive navigation menu for smaller screens.

---



##  Technologies Used

### Frontend

* **React**
* **JavaScript / JSX**
* **Vite**
* **Tailwind CSS**
* **React Router**
* **Lucide React**

### Animation & Interaction

* **GSAP**
* CSS transitions and animations

### Deployment

* **Cloudflare Workers**
* **Wrangler**

### Development Tools

* Git
* GitHub
* npm

---

## Project Structure

```text
Rihla/
├── public/
├── src/
│   ├── components/
│   │   └── rihla/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── wrangler.jsonc
```

The project is organized into reusable components, page-level components, data files, and custom hooks to make the website easier to maintain and expand.

## Deployment

Rihla is deployed using **Cloudflare Workers**.

The production build is generated using Vite and deployed using Wrangler:

```bash
npm run build
npx wrangler deploy
```


##  Team

**Created by:**

* Laiba Imran
* Ankita Ghosh
* Athira Olikkoor Raji
* Shruthika Meinathan
* Abhirami Pradeep
* Anna Tresa Vipin
