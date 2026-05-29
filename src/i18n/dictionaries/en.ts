const en = {
  locale: {
    code: 'en',
    htmlLang: 'en',
    openGraph: 'en_US',
  },
  site: {
    name: 'Life Clock',
    description:
      'A reflective life clock that visualizes your lifespan as a 24-hour clock.',
    author: 'DenDeline',
    authorUrl: 'https://dendeline.com',
    category: 'lifestyle',
    ogImageAlt: 'Life Clock visualizing a lifespan as a 24-hour clock',
  },
  routes: {
    home: {
      title: 'Life Clock | Visualize Your Life as a 24-Hour Clock',
      description:
        'A reflective life clock that turns your lifespan into a 24-hour view, helping you see time, progress, and perspective at a glance.',
      ariaLabel: 'Interactive life clock',
      intro: {
        title: 'Life Clock',
        body: 'Life Clock is a reflective tool that visualizes your life as a 24-hour clock. Add a starting date and an estimated endpoint to see where the current moment sits in a simple daily rhythm.',
      },
      sections: [
        {
          title: 'What it shows',
          body: 'The clock maps the time between your chosen start and end dates onto one full day. It is designed for perspective, not prediction, so the result works best as a calm visual reminder of time passing.',
        },
        {
          title: 'How it works',
          body: 'Choose a birth date or another meaningful start date, then enter either an end age or an exact end date. The app calculates your progress through that span and displays it as the current time on a 24-hour clock face.',
        },
      ],
      privacy: {
        title: 'Privacy',
        beforeLink:
          'Your dates stay in your browser. Life Clock stores the configuration locally on your device so the clock can reopen with the same settings, and it does not send those dates to a server. Read the full',
        link: 'Privacy Policy',
      },
    },
    privacy: {
      title: 'Privacy Policy | Life Clock',
      description:
        'Learn how Life Clock stores your clock settings locally in your browser and uses Google Analytics to understand site usage and performance.',
      heading: 'Privacy Policy',
      effectiveDateLabel: 'Effective date',
      effectiveDate: 'May 29, 2026',
      dateModified: '2026-05-29',
      sections: [
        {
          title: 'Who operates Life Clock',
          body: 'Life Clock is operated by DenDeline. For privacy questions or requests, contact contact@dendeline.com.',
        },
        {
          title: 'Information stored on your device',
          body: "Life Clock stores your clock configuration in your browser's local storage. This includes your start date, your end date, and whether the end date was entered directly or calculated from an end age. This information stays on your device and is used to reopen the clock with the same settings.",
        },
        {
          title: 'Information not sent to Life Clock',
          body: 'Life Clock does not send your start date, end date, or end age to an application server. The clock calculation runs in your browser. Because those settings are stored locally, clearing browser site data for Life Clock will remove them.',
        },
        {
          title: 'Analytics and performance data',
          body: 'In production, Life Clock uses Google Analytics to understand aggregate site usage and performance. Google Analytics may receive information such as the page URL, IP address, browser and device details, cookies or similar identifiers, and web-vitals event data such as loading and interaction metrics. Life Clock does not send your clock dates to Google Analytics.',
        },
        {
          title: 'How information is used',
          body: 'Local clock settings are used to operate the clock and remember your preferences on your device. Analytics and performance data are used to understand how visitors use the site, identify technical issues, and improve the experience.',
        },
        {
          title: 'Sharing',
          body: "Life Clock does not sell personal information. Analytics and performance data is processed by Google Analytics according to Google's terms and privacy practices. Learn more about how Google uses data from sites that use its services at policies.google.com/technologies/partner-sites.",
        },
        {
          title: 'Retention',
          body: "Your local clock settings remain in your browser until you clear local storage, clear site data, or reset your browser profile. Google Analytics retention is controlled by Google Analytics settings and Google's own retention practices.",
        },
        {
          title: 'Your choices',
          body: "You can clear Life Clock's local settings by clearing site data for this website in your browser. You can also block or clear cookies and similar identifiers through your browser settings. If you do not want Google Analytics to be used in your browser, you can install Google's Analytics opt-out browser add-on. You may also contact contact@dendeline.com with privacy questions or requests.",
        },
        {
          title: 'Children',
          body: 'Life Clock is not directed to children and does not knowingly collect personal information from children.',
        },
        {
          title: 'Updates',
          body: "This policy may be updated when Life Clock's privacy practices change. The effective date above indicates when this policy was last updated.",
        },
      ],
      backLink: 'Back to Life Clock',
    },
  },
  app: {
    dateFormat: 'DD/MM/YYYY',
    colorMode: {
      label: 'Color mode',
      system: 'System',
      light: 'Light',
      dark: 'Dark',
    },
    controls: {
      settings: 'Settings',
      hideInterface: 'Hide interface',
      showInterface: 'Show interface',
      toggleInterface: 'Toggle interface visibility',
    },
    dialog: {
      settingsTitle: 'Settings',
      welcomeTitle: 'Welcome',
      intro:
        "Visualize your life's journey through a unique 24-hour perspective.",
      close: 'Close',
      save: 'Save',
    },
    form: {
      startDate: 'Start date',
      endDateQuestion: 'How should the end date be calculated?',
      age: 'Age',
      date: 'Date',
      endAge: 'End age',
      endDate: 'End date',
      info: "We use your birthday to calculate how far you are along your life's clock. The mean lifespan helps us estimate the full 24-hour cycle. This information is only stored on your device and is not shared.",
    },
    validation: {
      startDateRequired: 'Start date must not be empty',
      endDateRequired: 'End date must not be empty',
      invalidDate: 'Invalid date',
      endAgePositive: 'End age must be greater than 0',
    },
  },
} as const

export default en
