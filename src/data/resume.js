export const profile = {
  name: 'Gopikrishnan G',
  firstName: 'Gopikrishnan',
  lastName: 'G',
  title: 'Flutter Developer',
  roleLine: 'Flutter Developer · Mobile App Developer',
  experienceYears: '2.5+',
  appsShipped: '15+',
  location: 'Coimbatore, India',
  status: 'Open to opportunities',
  phone: '+91 75400 43343',
  email: 'gopig6581@gmail.com',
  // Add your profile links here to show the GitHub / LinkedIn icons across the site.
  linkedin: '',
  github: '',
  resumeFile: '/Gopikrishnan_G.pdf',
  heroIntro:
    'I build reliable, user-friendly mobile apps with Flutter and Dart. With 2.5+ years of experience, I ship real-world apps for ride booking, billing, dealer management and field service.',
  summary:
    'Flutter Developer with 2.5+ years of experience in developing and maintaining mobile applications using Flutter and Dart. Experienced in state management using GetX, Provider, BLoC and Riverpod, along with REST API integration, Firebase, and local databases such as SQLite and Hive. Hands-on experience in developing real-world applications for taxi booking, billing and inventory management, lottery dealer management, and solar service management.',
  tagline: 'Passionate about building user-friendly, reliable and efficient mobile applications.',
}

export const featureCards = [
  {
    key: 'real-time',
    title: 'Real-Time Apps',
    text: 'Live GPS tracking, Socket.IO chat and push notifications for ride, dealer and technician workflows.',
  },
  {
    key: 'offline-first',
    title: 'Offline-First',
    text: 'SQLite and Hive storage with online sync so billing and field work never stop without a network.',
  },
  {
    key: 'hardware',
    title: 'Device Integrations',
    text: 'Bluetooth and USB printers, background location services and PDF generation inside Flutter apps.',
  },
]

export const skillGroups = [
  {
    key: 'mobile',
    label: 'Mobile Development',
    items: ['Flutter', 'Dart', 'Android', 'MVC Architecture', 'Multi-language Apps'],
  },
  {
    key: 'state',
    label: 'State Management',
    items: ['GetX', 'Provider', 'BLoC', 'Riverpod'],
  },
  {
    key: 'backend',
    label: 'Firebase & APIs',
    items: ['Firebase Authentication', 'Cloud Firestore', 'Push Notifications', 'RESTful APIs', 'Dio', 'Socket.IO'],
  },
  {
    key: 'maps',
    label: 'Maps & Location',
    items: ['Google Maps', 'Geolocation', 'Live Location Tracking', 'Flutter Foreground Task'],
  },
  {
    key: 'database',
    label: 'Offline Storage',
    items: ['SQLite', 'Hive', 'SharedPreferences'],
  },
  {
    key: 'devops',
    label: 'Tools & Devices',
    items: ['Multi-language (Localization)', 'Text Recognition (OCR)', 'Git', 'Bluetooth Printer', 'USB Printer', 'PDF Generation'],
  },
]

export const experience = [
  {
    company: 'Conceps Labs',
    role: 'Flutter Developer',
    location: 'Coimbatore',
    start: '2026',
    end: 'Present',
    current: true,
    points: [
      'Built ML Direct, a lottery dealer app with group chat, ticket feed, real-time messaging, voice notes and image sharing using Socket.IO.',
      'Built Space Solar dealer and technician apps for customer management, solar panel serial-number mapping and service requests.',
      'Integrated REST APIs with Dio for OTP login, ticket booking and order management, with role-based access, dashboards and analytics.',
      'Implemented background GPS tracking with Socket.IO and Flutter Foreground Task, plus Firebase push notifications for support tickets.',
    ],
  },
  {
    company: 'BS Teknology',
    role: 'Flutter Developer',
    location: 'Coimbatore',
    start: '2024',
    end: '2026',
    current: false,
    points: [
      'Built DG Equalside, a billing and inventory app with admin and super-admin authentication, dashboards and Bluetooth/USB receipt printing.',
      'Implemented bill-wise, item-wise, category-wise, sales and yearly report modules with print options, and SQLite offline storage.',
      'Built a matrimony app for the Nagarathar community with profile setup, matchmaking requests and secure image storage.',
      'Built a tailor management app with customer, order, measurement and billing modules, online sync, subscriptions and PDF invoices.',
    ],
  },
  {
    company: 'Lumy Software Solutions',
    role: 'Flutter Developer',
    location: 'Coimbatore',
    start: '2024',
    end: '2024',
    current: false,
    points: [
      'Built Taxi Deals, a real-time ride booking and trip management app (Driver & User) using Flutter and GetX.',
      'Integrated Google Maps for live driver tracking, route visualization and ETA calculation, with background location updates.',
      'Used Firebase Authentication and Messaging for login and notifications, and REST APIs for fares and trip history.',
    ],
  },
]

export const projectCategories = [
  { key: 'all', label: 'All' },
  { key: 'realtime', label: 'Real-Time & Tracking' },
  { key: 'business', label: 'Business & Billing' },
  { key: 'community', label: 'Community' },
]

export const projects = [
  {
    key: 'clear-entry',
    name: 'Clear Entry',
    category: 'business',
    playStore: 'https://play.google.com/store/apps/details?id=com.bstek.clear_entry&hl=en',
    tagline: 'Party-wise credit/debit transaction manager',
    description:
      'A party-wise credit/debit transaction management app — manage parties with opening balances, record credit and debit entries, and track running balances with full, filterable transaction history.',
    contribution: [
      'Created party management with add, edit and delete functionality.',
      'Implemented credit/debit entry while adding each party, with an opening balance.',
      'Developed a transaction page with party search and selection, transaction type (Credit / Debit), amount, notes and date input.',
      'Designed transaction history with a date-range filter and party-wise view.',
      'Displayed opening balance, total credit, total debit and closing balance, carrying today’s closing balance forward as tomorrow’s opening balance.',
      'Built full transaction history with each party’s credit/debit totals, and allowed editing and deleting of parties and individual transactions.',
    ],
    features: [
      'Party management with opening balance',
      'Credit / Debit transactions with amount, notes and date',
      'Party search and selection',
      'Transaction history with date-range filter and party-wise view',
      'Opening balance, total credit, total debit and closing balance',
      'Today’s closing balance becomes tomorrow’s opening balance',
      'Edit and delete parties and individual transactions',
    ],
    stack: ['Flutter', 'Dart', 'GetX'],
    galleries: [
      {
        label: 'App Screens',
        frame: 'phone',
        images: [
          { src: 'clear-entry/01-welcome.jpg', caption: 'Welcome' },
          { src: 'clear-entry/02-sign-in.jpg', caption: 'Sign in with mobile number' },
          { src: 'clear-entry/03-dashboard.jpg', caption: 'Dashboard — operations & overview' },
          { src: 'clear-entry/04-menu.jpg', caption: 'Navigation menu' },
          { src: 'clear-entry/05-add-transaction.jpg', caption: 'Add transaction — credit / debit' },
          { src: 'clear-entry/06-customer-list.jpg', caption: 'Customer list with balances' },
        ],
      },
    ],
  },
  {
    key: 'zillion-hms',
    name: 'Zillion HMS',
    category: 'business',
    tagline: 'Hospital management & consultation app',
    description:
      'A hospital management and consultation system — patient records, doctor consultations and reports, with cloud-based storage and sync for hospital staff.',
    contribution: [
      'Developed the hospital management and consultation system.',
      'Designed intuitive UI screens to manage patient records, including creating, editing and viewing profiles.',
      'Integrated cloud-based APIs for online data storage and synchronization.',
      'Implemented GetX with MVC architecture to handle state management and screen logic.',
      'Built features for doctors to manage consultations, view reports and update patient details.',
      'Ensured a smooth, user-friendly interface for hospital staff to access records quickly.',
    ],
    features: [
      'Patient profiles — create, edit and view',
      'Doctor consultations and reports',
      'Update patient details',
      'Cloud storage and synchronization',
      'Fast record access for hospital staff',
    ],
    stack: ['Flutter', 'GetX', 'MVC', 'REST APIs'],
    galleries: [],
  },
  {
    key: 'ecommerce-app',
    name: 'E-Commerce App',
    category: 'business',
    tagline: 'Product, order & billing management app',
    description:
      'An e-commerce application with admin and super-admin access for product and billing management, offline product storage, dynamic dashboards and Bluetooth/USB receipt printing.',
    contribution: [
      'Created an admin / super-admin login system for product and billing management.',
      'Used SQLite for offline product data storage with fast access.',
      'Designed dashboards and dynamic product and order screens.',
      'Integrated Bluetooth and USB printers for billing receipts.',
      'Enabled seamless navigation with BottomNavigationBar.',
      'Built using GetX MVC for clear code separation.',
    ],
    features: [
      'Admin and super-admin login',
      'Product and order management',
      'Offline product storage with SQLite',
      'Bluetooth / USB receipt printing',
      'Bottom navigation between sections',
    ],
    stack: ['Flutter', 'GetX', 'MVC', 'SQLite', 'Bluetooth Printer'],
    galleries: [],
  },
  {
    key: 'visiting-card-scanner',
    name: 'Visiting Card Scanner',
    category: 'business',
    tagline: 'Scan visiting cards into text',
    description:
      'An app that scans a visiting card with the camera and extracts the text on it, so contact details don’t have to be typed in by hand.',
    contribution: [
      'Built an app that scans visiting cards and extracts their text.',
    ],
    features: [
      'Scan a visiting card with the camera',
      'Extract the text from the card',
    ],
    stack: ['Flutter', 'Dart', 'Text Recognition'],
    galleries: [],
  },
  {
    key: 'space-solar',
    name: 'Space Solar',
    category: 'realtime',
    tagline: 'Dealer & technician management app',
    description:
      'Dealer and technician apps for a solar company — customer management, solar panel serial-number mapping, support tickets and technician field workflows with background GPS tracking.',
    contribution: [
      'Developed dealer and technician apps for customer management, solar panel serial-number mapping and service requests.',
      'Implemented phone number and OTP-based login, customer registration and sold-panel tracking.',
      'Integrated support ticket management with status updates and Firebase push notifications.',
      'Implemented technician workflows for ticket acceptance, work duration tracking, status updates and service photo uploads.',
      'Integrated background GPS tracking using Socket.IO and Flutter Foreground Task, with Dio, Hive and SharedPreferences.',
    ],
    features: [
      'OTP login for dealers and technicians',
      'Customer registration and solar panel serial-number mapping',
      'Support tickets with status updates and push notifications',
      'Technician ticket acceptance, work-duration tracking and photo uploads',
      'Background live GPS tracking of technicians',
    ],
    stack: ['Flutter', 'Socket.IO', 'Firebase', 'Dio', 'Hive', 'Foreground Task'],
    galleries: [],
  },
  {
    key: 'taxi-deals',
    playStore: 'https://play.google.com/store/apps/details?id=com.taxideals.user.flutter&hl=en',
    name: 'Taxi Deals',
    category: 'realtime',
    tagline: 'Ride booking app (Driver & User)',
    description:
      'A real-time ride booking and trip management system with separate driver and user apps — live driver tracking on Google Maps, route visualization, ETA calculation, fares and trip history.',
    contribution: [
      'Built the real-time ride booking and trip management system using Flutter with GetX state management.',
      'Integrated Google Maps for live driver tracking, route visualization and ETA calculation.',
      'Implemented geolocation and background location tracking for driver movement updates.',
      'Used Firebase Authentication and Messaging for login and notifications.',
      'Calculated fares and trip history using REST APIs.',
    ],
    features: [
      'Separate driver and user apps',
      'Live driver tracking with route and ETA on Google Maps',
      'Background location updates for drivers',
      'Firebase login and push notifications',
      'Fare calculation and trip history',
    ],
    stack: ['Flutter', 'GetX', 'Google Maps', 'Firebase', 'REST APIs'],
    galleries: [
      {
        label: 'User App',
        frame: 'phone',
        images: [
          { src: 'taxi-deals/01-where-to.jpg', caption: 'Where to? — city taxi or outstation' },
          { src: 'taxi-deals/02-route-drivers.jpg', caption: 'Route on Google Maps & nearby drivers' },
          { src: 'taxi-deals/03-booking-details.jpg', caption: 'Booking details' },
          { src: 'taxi-deals/04-ride-accepted.jpg', caption: 'Ride accepted — driver, OTP & ETA' },
          { src: 'taxi-deals/05-menu.jpg', caption: 'Menu & wallet' },
          { src: 'taxi-deals/06-trip-history.jpg', caption: 'Trip history' },
        ],
      },
      {
        label: 'Driver App',
        frame: 'phone',
        images: [
          { src: 'taxi-deals/07-on-duty.jpg', caption: 'On duty — live location' },
          { src: 'taxi-deals/08-request-details.jpg', caption: 'Incoming ride request' },
          { src: 'taxi-deals/09-enter-otp.jpg', caption: 'Verify rider OTP' },
          { src: 'taxi-deals/10-ride-finished.jpg', caption: 'Ride finished — fare & rating' },
          { src: 'taxi-deals/11-vehicle-info.jpg', caption: 'Vehicle info' },
          { src: 'taxi-deals/12-profile.jpg', caption: 'Profile update' },
          { src: 'taxi-deals/13-help.jpg', caption: 'Help & support' },
        ],
      },
    ],
  },
  {
    key: 'dg-equalside',
    playStore: 'https://play.google.com/store/apps/details?id=com.bstek.dgequalside&hl=en',
    name: 'DG Equalside',
    category: 'business',
    tagline: 'Billing & inventory management app',
    description:
      'A billing and inventory app with admin and super-admin access, dynamic product, order and billing screens, Bluetooth/USB receipt printing with company logo, detailed reports and offline product storage.',
    contribution: [
      'Developed admin and super-admin authentication for secure product and billing management using GetX.',
      'Designed interactive dashboards with dynamic product, order and billing management screens.',
      'Integrated Bluetooth and USB printers to generate billing receipts with company logo support.',
      'Implemented bill-wise, item-wise, category-wise, sales and yearly reports with print options.',
      'Used SQLite for offline product storage to ensure faster access and uninterrupted billing.',
    ],
    features: [
      'Admin and super-admin roles',
      'Product, order and billing dashboards',
      'Bluetooth and USB receipt printing with company logo',
      'Bill-wise, item-wise, category-wise, sales and yearly reports',
      'Offline billing with SQLite',
    ],
    stack: ['Flutter', 'GetX', 'SQLite', 'Bluetooth Printer', 'USB Printer'],
    galleries: [
      {
        label: 'App Screens',
        frame: 'phone',
        images: [
          { src: 'dg-equalside/01-splash.jpg', caption: 'DG — Digital Gateway to Easy POS' },
          { src: 'dg-equalside/02-sign-in.jpg', caption: 'Sign in with Corp ID' },
          { src: 'dg-equalside/03-dashboard.jpg', caption: 'Dashboard — today’s bill report' },
          { src: 'dg-equalside/04-menu.jpg', caption: 'Admin menu & reports' },
          { src: 'dg-equalside/05-products.jpg', caption: 'Products' },
          { src: 'dg-equalside/06-add-product.jpg', caption: 'Add product with printing name' },
          { src: 'dg-equalside/07-item-wise-report.jpg', caption: 'Item-wise report' },
          { src: 'dg-equalside/08-bill-wise-items-report.jpg', caption: 'Bill-wise items report' },
        ],
      },
    ],
  },
  {
    key: 'tailor-management',
    name: 'Tailor Management',
    category: 'business',
    tagline: 'Tailoring shop management app',
    description:
      'A complete tailoring management application with offline and online support — customers, orders, measurements, billing, subscription plans and PDF invoices.',
    contribution: [
      'Designed and developed the complete tailoring management application with offline and online support.',
      'Implemented customer management, order status tracking, measurement handling and billing.',
      'Integrated SQLite for offline storage, online sync and subscription-based plans.',
      'Implemented PDF generation for invoices and order documentation.',
    ],
    features: [
      'Customer and measurement management',
      'Order status tracking',
      'Billing with PDF invoices',
      'Works offline, syncs online',
      'Subscription-based plans',
    ],
    stack: ['Flutter', 'SQLite', 'PDF', 'REST APIs'],
    galleries: [],
  },
  {
    key: 'nagarathar-matrimony',
    playStore: 'https://play.google.com/store/search?q=nagarathar+matrimony+app&c=apps&hl=en',
    name: 'Nagarathar Matrimony',
    category: 'community',
    tagline: 'Community matrimony app',
    description:
      'A community-focused matrimony application tailored for the Nagarathar community, with profile setup, matchmaking requests and secure, privacy-first image storage.',
    contribution: [
      'Built the community-focused matrimony application for the Nagarathar community.',
      'Implemented user profile setup, matchmaking requests and end-to-end interaction workflows.',
      'Ensured data privacy through secure authentication and protected image storage.',
    ],
    features: [
      'User profile setup',
      'Matchmaking requests and responses',
      'Secure authentication',
      'Protected image storage',
    ],
    stack: ['Flutter', 'Firebase', 'REST APIs'],
    galleries: [
      {
        label: 'App Screens',
        frame: 'phone',
        images: [
          { src: 'matrimony/01-splash.jpg', caption: 'Nagarathar Thirumanam' },
          { src: 'matrimony/02-sign-in.jpg', caption: 'Sign in' },
          { src: 'matrimony/03-matches.jpg', caption: 'My matches' },
          { src: 'matrimony/04-preferences.jpg', caption: 'Set your preferences' },
        ],
      },
    ],
  },
]

export const education = [
  {
    degree: 'B.Sc (Computer Science)',
    school: 'Arulmigu Kalasalingam College of Arts and Science',
    period: '2020 – 2023',
  },
  {
    degree: 'HSC',
    school: 'Kalaimagal Higher Secondary School',
    period: '2018 – 2020',
  },
  {
    degree: 'SSLC',
    school: 'Kalaimagal Higher Secondary School',
    period: '2017 – 2018',
  },
]
