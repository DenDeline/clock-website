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
          body: [
            'Life Clock is operated by DenDeline. For privacy questions or requests, contact ',
            {
              type: 'link',
              href: 'mailto:contact@dendeline.com',
              text: 'contact@dendeline.com',
            },
            '.',
          ],
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
          body: [
            "Life Clock does not sell personal information. Analytics and performance data is processed by Google Analytics according to Google's terms and privacy practices. Learn more about how Google uses data from sites that use its services at ",
            {
              type: 'link',
              href: 'https://policies.google.com/technologies/partner-sites',
              text: 'policies.google.com/technologies/partner-sites',
            },
            '.',
          ],
        },
        {
          title: 'Retention',
          body: "Your local clock settings remain in your browser until you clear local storage, clear site data, or reset your browser profile. Google Analytics retention is controlled by Google Analytics settings and Google's own retention practices.",
        },
        {
          title: 'Your choices',
          body: [
            "You can clear Life Clock's local settings by clearing site data for this website in your browser. You can also block or clear cookies and similar identifiers through your browser settings. If you do not want Google Analytics to be used in your browser, you can install Google's Analytics opt-out browser add-on. You may also contact ",
            {
              type: 'link',
              href: 'mailto:contact@dendeline.com',
              text: 'contact@dendeline.com',
            },
            ' with privacy questions or requests.',
          ],
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
    onboarding: {
      eyebrow: 'Life as a 24-hour clock',
      title: 'Life Clock',
      body: 'Enter your date of birth to see your life mapped onto one simple day.',
      birthDate: 'Date of birth',
      getStarted: 'Get started',
      privacyPrefix: 'I have read and agree to the',
      privacyLink: 'Privacy Policy',
      storageNote:
        'The date you enter is saved in this browser only and is never sent to a server.',
    },
    colorMode: {
      label: 'Color mode',
      system: 'System',
      light: 'Light',
      dark: 'Dark',
    },
    controls: {
      settings: 'Settings',
      sourceCode: 'Source code',
      hideInterface: 'Hide interface',
      showInterface: 'Show interface',
      toggleInterface: 'Toggle interface visibility',
    },
    tabs: {
      clock: 'Clock',
      settings: 'Settings',
    },
    form: {
      startDate: 'Date of birth',
      age: 'Age',
      date: 'Date',
      endAge: 'End age',
      endDate: 'End date',
      useAmPm: 'Use AM/PM time',
    },
    validation: {
      startDateRequired: 'Date of birth must not be empty',
      startDateFuture: 'Date of birth must not be in the future',
      endDateRequired: 'End date must not be empty',
      invalidDate: 'Invalid date',
      endAgePositive: 'End age must be greater than 0',
      endDateAfterStart: 'End date must be after date of birth',
      privacyAcceptedRequired:
        'You must agree to the Privacy Policy to continue',
    },
    pwa: {
      updateAvailable: 'A new version is available.',
      update: 'Update',
      later: 'Later',
    },
  },
} as const

export default en
