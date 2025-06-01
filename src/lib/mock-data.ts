
export interface Unit {
  id: string;
  title: string;
  summary: string;
  content?: string; // Full content for the unit
  totalDownloads: number;
  rating: number;
}

export interface Note {
  id: string;
  title: string;
  category: string; // e.g., BBA, BCA, Mathematics
  subject: string;
  semester: number; // Added semester field
  summary: string;
  content?: string; // Full content for detail view
  imageUrl?: string;
  dataAiHint?: string;
  createdAt: string;
  units?: Unit[]; // Array of units within this note
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  dataAiHint?: string;
  videoUrl: string; // Could be YouTube embed ID or direct URL
  duration: string;
  category: string;
  subject: string;
  uploader: string;
  uploadDate: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  dataAiHint?: string;
  subscriptionStatus: 'Free' | 'Premium' | 'Pro';
  isEmailVerified: boolean; // Added for email verification
  joinDate: string;
  recentlyViewed: Array<{ id: string; type: 'note' | 'video'; title: string; timestamp: string }>;
}

export const mockNotes: Note[] = [
  {
    id: 'note-1',
    title: 'Introduction to Calculus',
    category: 'Mathematics',
    subject: 'Calculus I',
    semester: 1,
    summary: 'Fundamental concepts of limits, derivatives, and integrals.',
    imageUrl: 'https://placehold.co/600x400.png?text=Calculus',
    dataAiHint: 'mathematics calculus',
    createdAt: '2023-01-15T10:00:00Z',
  },
  {
    id: 'note-2',
    title: 'Newton\'s Laws of Motion',
    category: 'Physics',
    subject: 'Classical Mechanics',
    semester: 1,
    summary: 'Understanding the three laws that govern motion and forces.',
    imageUrl: 'https://placehold.co/600x400.png?text=Physics',
    dataAiHint: 'physics science',
    createdAt: '2023-02-20T14:30:00Z',
  },
  {
    id: 'note-3',
    title: 'Cellular Respiration',
    category: 'Biology',
    subject: 'Cell Biology',
    semester: 1,
    summary: 'The process by which organisms convert biochemical energy from nutrients into ATP.',
    imageUrl: 'https://placehold.co/600x400.png?text=Biology',
    dataAiHint: 'biology cells',
    createdAt: '2023-03-10T09:15:00Z',
  },
  {
    id: 'note-4',
    title: 'The French Revolution',
    category: 'History',
    subject: 'European History',
    semester: 1,
    summary: 'A period of social and political upheaval in late 18th-century France.',
    imageUrl: 'https://placehold.co/600x400.png?text=History',
    dataAiHint: 'history revolution',
    createdAt: '2023-04-05T11:45:00Z',
  },
  {
    id: 'pom-main',
    title: 'Principles of Management',
    category: 'BBA',
    subject: 'Principles of Management',
    semester: 1,
    summary: 'A comprehensive course covering all key units of Principles of Management, from foundational concepts to strategic control and emerging issues.',
    imageUrl: 'https://placehold.co/600x400.png?text=Management+Course',
    dataAiHint: 'business management',
    createdAt: '2023-09-01T10:00:00Z',
    units: [
      {
        id: 'pom-unit-1',
        title: 'Unit 1: Introduction to Management & Organization',
        summary: 'Defining management, its nature, scope, and importance. Understanding organizational structures and the evolution of management thought.',
        content: 'Detailed content for Unit 1 covering definitions of management, roles of managers (Mintzberg), levels of management, management skills, evolution of management theories (Classical, Behavioral, Quantitative, Contemporary), and types of organizational structures.',
        totalDownloads: 1250,
        rating: 4
      },
      {
        id: 'pom-unit-2',
        title: 'Unit 2: Planning & Decision Making',
        summary: 'Exploring the planning process, types of plans, and techniques. Understanding decision-making models and their application in business.',
        content: 'In-depth explanation of the planning process (defining objectives, assessing current position, identifying alternatives, evaluating alternatives, selecting a course of action, implementing the plan, monitoring results). Types of plans (strategic, tactical, operational). Decision-making process and models (rational, bounded rationality, intuition).',
        totalDownloads: 980,
        rating: 5
      },
      {
        id: 'pom-unit-3',
        title: 'Unit 3: Organizing',
        summary: 'Principles of organizing, organizational design, departmentalization, span of control, delegation, and decentralization.',
        content: 'Core principles of organizing. Organizational design (mechanistic vs. organic). Departmentalization (functional, product, geographic, customer, matrix). Span of control. Authority, responsibility, and accountability. Delegation of authority and decentralization.',
        totalDownloads: 1100,
        rating: 4
      },
      {
        id: 'pom-unit-4',
        title: 'Unit 4: Directing & Leading',
        summary: 'Elements of directing: motivation, leadership styles and theories, communication processes, and barriers to effective communication.',
        content: 'Key elements of directing. Motivation theories (Maslow, Herzberg, McGregor). Leadership styles (autocratic, democratic, laissez-faire) and theories (trait, behavioral, contingency). Communication process, channels, and barriers. Effective communication strategies.',
        totalDownloads: 850,
        rating: 3
      },
      {
        id: 'pom-unit-5',
        title: 'Unit 5: Controlling & Emerging Issues',
        summary: 'The control process, types of control, control techniques. Discussion on contemporary management issues like globalization and corporate social responsibility.',
        content: 'The control process (establishing standards, measuring performance, comparing performance to standards, taking corrective action). Types of control (feedforward, concurrent, feedback). Control techniques. Emerging issues in management: globalization, technological advancements, workforce diversity, ethics, corporate social responsibility (CSR).',
        totalDownloads: 1500,
        rating: 5
      }
    ]
  },
  {
    id: 'bba-note-2',
    title: 'Fundamentals of Financial Accounting',
    category: 'BBA',
    subject: 'Financial Accounting',
    semester: 1,
    summary: 'A comprehensive course covering key aspects of financial accounting, from basic principles to financial statement analysis.',
    imageUrl: 'https://placehold.co/600x400.png?text=Accounting',
    dataAiHint: 'finance accounting',
    createdAt: '2023-09-05T14:30:00Z',
    units: [
      {
        id: 'fa-unit-1',
        title: 'Unit 1: Introduction to Accounting & Basic Concepts',
        summary: 'Understanding the role of accounting, key terms, and fundamental principles.',
        content: 'This unit covers the definition of accounting, its objectives, users of accounting information, basic accounting terms (assets, liabilities, equity, revenue, expenses), and fundamental accounting principles like GAAP.',
        totalDownloads: 1100,
        rating: 4
      },
      {
        id: 'fa-unit-2',
        title: 'Unit 2: The Accounting Cycle & Recording Transactions',
        summary: 'Exploring the steps in the accounting cycle and how to record business transactions.',
        content: 'Details the accounting cycle: identifying transactions, journalizing, posting to ledger, trial balance, adjusting entries, adjusted trial balance, financial statements, and closing entries.',
        totalDownloads: 1050,
        rating: 5
      },
      {
        id: 'fa-unit-3',
        title: 'Unit 3: Preparing Financial Statements',
        summary: 'Focus on preparing the Balance Sheet, Income Statement, and Statement of Retained Earnings.',
        content: 'Covers the structure and preparation of the Income Statement, Statement of Retained Earnings, and Balance Sheet. Includes examples and common classifications.',
        totalDownloads: 1300,
        rating: 4
      },
      {
        id: 'fa-unit-4',
        title: 'Unit 4: Cash Flow Statement & Financial Ratios',
        summary: 'Understanding the Statement of Cash Flows and key financial ratio analysis.',
        content: 'Explains the purpose and preparation of the Statement of Cash Flows (operating, investing, financing activities). Introduces key financial ratios for liquidity, profitability, and solvency analysis.',
        totalDownloads: 950,
        rating: 4
      },
      {
        id: 'fa-unit-5',
        title: 'Unit 5: Introduction to Company Accounts',
        summary: 'Basic concepts related to accounting for corporations, including share capital and dividends.',
        content: 'This unit introduces accounting for incorporated companies, types of shares, issue of shares, and accounting for dividends. Basics of reporting standards.',
        totalDownloads: 800,
        rating: 3
      }
    ]
  },
  {
    id: 'bba-note-3',
    title: 'Introduction to Business Economics',
    category: 'BBA',
    subject: 'Business Economics',
    semester: 2,
    summary: 'An overview of micro and macroeconomic principles and their application in business decision-making.',
    imageUrl: 'https://placehold.co/600x400.png?text=Economics',
    dataAiHint: 'business economics',
    createdAt: '2023-09-10T09:15:00Z',
    units: [
      {
        id: 'be-unit-1',
        title: 'Unit 1: Nature & Scope of Business Economics',
        summary: 'Defining business economics and its relevance in managerial decision-making.',
        content: 'Covers the definition, nature, and scope of business economics. Discusses the role of economic theory in business decisions and the relationship with other disciplines.',
        totalDownloads: 1000,
        rating: 4
      },
      {
        id: 'be-unit-2',
        title: 'Unit 2: Demand Analysis & Forecasting',
        summary: 'Understanding demand, its determinants, elasticity, and methods of demand forecasting.',
        content: 'Explores the law of demand, determinants of demand, elasticity of demand (price, income, cross), and various techniques for demand forecasting.',
        totalDownloads: 1150,
        rating: 5
      },
      {
        id: 'be-unit-3',
        title: 'Unit 3: Production & Cost Analysis',
        summary: 'Examining production functions, laws of returns, and various cost concepts.',
        content: 'Discusses production functions, law of variable proportions, returns to scale, economies and diseconomies of scale, and different cost concepts (short-run and long-run costs).',
        totalDownloads: 900,
        rating: 4
      },
      {
        id: 'be-unit-4',
        title: 'Unit 4: Market Structures & Pricing Strategies',
        summary: 'Analyzing different market structures (perfect competition, monopoly, etc.) and pricing policies.',
        content: 'Covers characteristics and price-output determination under perfect competition, monopoly, monopolistic competition, and oligopoly. Overview of pricing strategies.',
        totalDownloads: 1200,
        rating: 5
      },
      {
        id: 'be-unit-5',
        title: 'Unit 5: Introduction to Macroeconomics',
        summary: 'Basic macroeconomic concepts like national income, inflation, and business cycles.',
        content: 'Introduces fundamental macroeconomic concepts including national income accounting, inflation (types and causes), and the phases of business cycles.',
        totalDownloads: 850,
        rating: 3
      }
    ]
  },
  {
    id: 'bba-note-4',
    title: 'Marketing Management Essentials',
    category: 'BBA',
    subject: 'Marketing Management',
    semester: 2,
    summary: 'A foundational course in marketing management, covering market analysis, strategy, and the marketing mix.',
    imageUrl: 'https://placehold.co/600x400.png?text=Marketing',
    dataAiHint: 'business marketing',
    createdAt: '2023-09-15T11:45:00Z',
    units: [
      {
        id: 'mm-unit-1',
        title: 'Unit 1: Introduction to Marketing & Core Concepts',
        summary: 'Defining marketing, its evolution, core concepts, and importance in business.',
        content: 'This unit covers the definition of marketing, its evolution (production, product, selling, marketing, societal marketing concepts), core marketing concepts (needs, wants, demands, value, satisfaction), and the role of marketing in organizations.',
        totalDownloads: 1300,
        rating: 5
      },
      {
        id: 'mm-unit-2',
        title: 'Unit 2: Marketing Environment & Research',
        summary: 'Analyzing the marketing environment (micro and macro) and the process of marketing research.',
        content: 'Discusses the components of the marketing environment (micro-environment and macro-environment factors) and the steps involved in the marketing research process.',
        totalDownloads: 1050,
        rating: 4
      },
      {
        id: 'mm-unit-3',
        title: 'Unit 3: Consumer Behavior & STP',
        summary: 'Understanding consumer buying behavior and the process of Segmentation, Targeting, and Positioning (STP).',
        content: 'Explores models of consumer behavior, factors influencing consumer decisions, and the STP process: market segmentation, target market selection, and product positioning strategies.',
        totalDownloads: 1250,
        rating: 5
      },
      {
        id: 'mm-unit-4',
        title: 'Unit 4: Product & Pricing Strategies',
        summary: 'Developing product strategies (product life cycle, branding) and pricing approaches.',
        content: 'Covers product classification, product mix decisions, product life cycle management, branding, packaging, labeling, and various pricing strategies and considerations.',
        totalDownloads: 1100,
        rating: 4
      },
      {
        id: 'mm-unit-5',
        title: 'Unit 5: Distribution Channels & Promotion Mix',
        summary: 'Managing marketing channels and designing effective integrated marketing communications (promotion mix).',
        content: 'Explains types of marketing channels, channel design decisions, and channel management. Introduces the elements of the promotion mix (advertising, sales promotion, public relations, personal selling, direct marketing) and integrated marketing communications.',
        totalDownloads: 950,
        rating: 4
      }
    ]
  },
  {
    id: 'bba-note-5',
    title: 'Basics of Human Resource Management',
    category: 'BBA',
    subject: 'Human Resource Management',
    semester: 3,
    summary: 'An introductory course to HRM, covering recruitment, performance management, and employee relations.',
    imageUrl: 'https://placehold.co/600x400.png?text=HRM',
    dataAiHint: 'business human resources',
    createdAt: '2023-09-20T16:00:00Z',
    units: [
      {
        id: 'hrm-unit-1',
        title: 'Unit 1: Introduction to HRM: Nature, Scope & Functions',
        summary: 'Understanding the concept of HRM, its objectives, functions, and evolving role.',
        content: 'This unit defines Human Resource Management, outlines its nature, scope, objectives, and key functions (e.g., acquisition, development, motivation, maintenance). It also discusses the strategic role of HRM.',
        totalDownloads: 980,
        rating: 4
      },
      {
        id: 'hrm-unit-2',
        title: 'Unit 2: Human Resource Planning & Job Analysis',
        summary: 'Exploring the process of HRP, job analysis, job design, job description, and job specification.',
        content: 'Covers the steps in Human Resource Planning (HRP), techniques for forecasting HR needs, and the process of job analysis leading to job description and job specification. Basics of job design.',
        totalDownloads: 850,
        rating: 3
      },
      {
        id: 'hrm-unit-3',
        title: 'Unit 3: Recruitment, Selection & Induction',
        summary: 'Understanding the processes of attracting, selecting, and onboarding new employees.',
        content: 'Details the recruitment process (sources of recruitment), selection process (steps like application screening, tests, interviews), and the importance and methods of employee induction/orientation.',
        totalDownloads: 1120,
        rating: 5
      },
      {
        id: 'hrm-unit-4',
        title: 'Unit 4: Training, Development & Performance Appraisal',
        summary: 'Methods of employee training and development, and the process of performance appraisal.',
        content: 'Explains the need for training and development, various training methods (on-the-job and off-the-job), and the purpose and methods of performance appraisal.',
        totalDownloads: 1020,
        rating: 4
      },
      {
        id: 'hrm-unit-5',
        title: 'Unit 5: Compensation Management & Employee Relations',
        summary: 'Fundamentals of compensation, benefits, and maintaining healthy employee relations.',
        content: 'Covers components of employee compensation, factors influencing compensation, types of employee benefits, and an introduction to employee relations, grievance handling, and discipline.',
        totalDownloads: 900,
        rating: 4
      }
    ]
  },
  {
    id: 'bca-c-programming',
    title: 'Programming in C',
    category: 'BCA',
    subject: 'C Programming',
    semester: 1,
    summary: 'A comprehensive introduction to the C programming language, covering fundamental concepts, control structures, functions, pointers, and file handling.',
    imageUrl: 'https://placehold.co/600x400.png?text=C+Programming',
    dataAiHint: 'code programming',
    createdAt: '2023-10-01T10:00:00Z',
    units: [
      {
        id: 'c-unit-1',
        title: 'Unit 1: Introduction to C Programming',
        summary: 'Basics of C, data types, variables, operators, and input/output operations.',
        content: 'History of C, features, structure of a C program, compilation and execution. Character set, C tokens, keywords, identifiers, constants, variables, data types. Operators: arithmetic, relational, logical, assignment, increment/decrement, conditional, bitwise, special. Formatted input and output functions.',
        totalDownloads: 1500,
        rating: 5
      },
      {
        id: 'c-unit-2',
        title: 'Unit 2: Control Structures & Arrays',
        summary: 'Decision making with if, switch statements, loops (while, do-while, for), and introduction to arrays.',
        content: 'Decision making statements: if, if-else, nested if-else, else-if ladder, switch. Looping statements: while, do-while, for. Jumps in loops. One-dimensional arrays: declaration, initialization, accessing elements. Two-dimensional arrays.',
        totalDownloads: 1350,
        rating: 4
      },
      {
        id: 'c-unit-3',
        title: 'Unit 3: Functions & Pointers',
        summary: 'Understanding user-defined functions, recursion, and the concept of pointers in C.',
        content: 'User-defined functions: need, elements, return values, function calls, function declaration, function definition. Recursion. Pointers: understanding pointers, declaring and initializing pointers, accessing a variable through its pointer. Pointer expressions, pointer arithmetic.',
        totalDownloads: 1400,
        rating: 5
      },
       {
        id: 'c-unit-4',
        title: 'Unit 4: Structures & Unions',
        summary: 'Defining and using structures and unions for complex data types.',
        content: 'Structures: defining a structure, declaring structure variables, accessing structure members, array of structures, structures and functions. Unions: defining a union, declaring union variables, accessing union members. Difference between structures and unions.',
        totalDownloads: 1200,
        rating: 4
      },
      {
        id: 'c-unit-5',
        title: 'Unit 5: File Handling in C',
        summary: 'Performing file operations like opening, closing, reading, and writing files.',
        content: 'File management in C: defining and opening a file, closing a file. Input/output operations on files: getc(), putc(), gets(), puts(), fscanf(), fprintf(). Error handling during I/O operations. Random access to files.',
        totalDownloads: 1100,
        rating: 3
      }
    ]
  },
  {
    id: 'bca-data-structures',
    title: 'Data Structures Using C',
    category: 'BCA',
    subject: 'Data Structures',
    semester: 2,
    summary: 'Learn fundamental data structures like arrays, stacks, queues, linked lists, trees, and graphs, along with their C implementations.',
    imageUrl: 'https://placehold.co/600x400.png?text=Data+Structures',
    dataAiHint: 'algorithms data structures',
    createdAt: '2023-10-05T14:00:00Z',
    units: [
      {
        id: 'ds-unit-1',
        title: 'Unit 1: Introduction to Data Structures & Algorithms',
        summary: 'Basic concepts of data structures, algorithm analysis, time and space complexity.',
        content: 'Data structures: definition, classification (linear and non-linear). Algorithm: definition, characteristics. Asymptotic notations (Big O, Big Omega, Big Theta). Time and space complexity analysis of algorithms.',
        totalDownloads: 1600,
        rating: 5
      },
      {
        id: 'ds-unit-2',
        title: 'Unit 2: Arrays, Stacks & Queues',
        summary: 'In-depth study of arrays, and linear data structures: stacks and queues with their applications.',
        content: 'Arrays: representation, operations. Stacks: definition, operations (push, pop), array representation, applications (recursion, expression conversion). Queues: definition, operations (enqueue, dequeue), array representation, types of queues (circular, priority), applications.',
        totalDownloads: 1450,
        rating: 4
      },
      {
        id: 'ds-unit-3',
        title: 'Unit 3: Linked Lists',
        summary: 'Understanding singly, doubly, and circular linked lists, their operations and applications.',
        content: 'Linked lists: definition, representation, operations (insertion, deletion, traversal). Singly linked lists. Doubly linked lists. Circular linked lists. Applications of linked lists (polynomial representation, stack and queue implementation).',
        totalDownloads: 1500,
        rating: 5
      },
      {
        id: 'ds-unit-4',
        title: 'Unit 4: Trees',
        summary: 'Introduction to tree data structures, binary trees, binary search trees, and traversal techniques.',
        content: 'Trees: basic terminology, binary trees, representation, traversal (inorder, preorder, postorder). Binary Search Trees (BST): definition, operations (search, insert, delete). AVL trees (introduction).',
        totalDownloads: 1300,
        rating: 4
      },
      {
        id: 'ds-unit-5',
        title: 'Unit 5: Graphs & Sorting/Searching',
        summary: 'Basics of graph theory, graph representations, traversals (BFS, DFS), and fundamental sorting and searching algorithms.',
        content: 'Graphs: terminology, representation (adjacency matrix, adjacency list). Graph traversal algorithms: Breadth-First Search (BFS), Depth-First Search (DFS). Sorting algorithms: bubble sort, selection sort, insertion sort, merge sort, quick sort (introduction). Searching algorithms: linear search, binary search.',
        totalDownloads: 1250,
        rating: 3
      }
    ]
  },
   {
    id: 'bca-dbms',
    title: 'Database Management Systems (DBMS)',
    category: 'BCA',
    subject: 'DBMS',
    semester: 3,
    summary: 'Core concepts of database systems, data models, SQL, normalization, and transaction management.',
    imageUrl: 'https://placehold.co/600x400.png?text=DBMS',
    dataAiHint: 'database sql',
    createdAt: '2023-10-10T10:00:00Z',
    units: [
      {
        id: 'dbms-unit-1',
        title: 'Unit 1: Introduction to Database Systems',
        summary: 'Overview of database systems, advantages, data models, and database system architecture.',
        content: 'Database concepts, purpose of database systems, views of data, data models (ER, relational, object-based), database languages (DDL, DML), database users and administrators, transaction management, database system structure.',
        totalDownloads: 1400,
        rating: 4
      },
      {
        id: 'dbms-unit-2',
        title: 'Unit 2: Relational Model & SQL Basics',
        summary: 'Understanding the relational data model, relational algebra, and basic SQL commands.',
        content: 'Relational model concepts, integrity constraints (key, entity, referential), relational algebra. SQL: DDL (CREATE, ALTER, DROP), DML (SELECT, INSERT, UPDATE, DELETE), basic queries, aggregate functions, grouping.',
        totalDownloads: 1700,
        rating: 5
      },
      {
        id: 'dbms-unit-3',
        title: 'Unit 3: Advanced SQL & ER Modeling',
        summary: 'Advanced SQL features like joins, subqueries, views, and Entity-Relationship modeling.',
        content: 'SQL joins (inner, outer), subqueries, views. Entity-Relationship (ER) model: entities, attributes, relationships, ER diagrams. Converting ER diagrams to relational tables.',
        totalDownloads: 1550,
        rating: 5
      },
      {
        id: 'dbms-unit-4',
        title: 'Unit 4: Database Design & Normalization',
        summary: 'Functional dependencies, normalization process (1NF, 2NF, 3NF, BCNF), and database design guidelines.',
        content: 'Database design process, functional dependencies, Armstrong\'s axioms. Normalization: purpose, normal forms (1NF, 2NF, 3NF, BCNF). Lossless join and dependency preservation.',
        totalDownloads: 1300,
        rating: 4
      },
      {
        id: 'dbms-unit-5',
        title: 'Unit 5: Transaction Management & Concurrency Control',
        summary: 'Concepts of transactions, ACID properties, concurrency control techniques, and recovery mechanisms.',
        content: 'Transaction concepts, ACID properties. Concurrency control: problems, techniques (locking, timestamping). Deadlock handling. Recovery system: log-based recovery, shadow paging.',
        totalDownloads: 1150,
        rating: 3
      }
    ]
  },
  {
    id: 'bpharm-pharma-chem-1',
    title: 'Pharmaceutical Chemistry I',
    category: 'B.Pharm',
    subject: 'Pharmaceutical Chemistry',
    semester: 1,
    summary: 'Fundamental concepts of pharmaceutical chemistry including acids, bases, organic chemistry basics, stereochemistry, and quality control.',
    imageUrl: 'https://placehold.co/600x400.png?text=Pharma+Chemistry',
    dataAiHint: 'pharmacy chemistry',
    createdAt: '2023-11-01T10:00:00Z',
    units: [
      {
        id: 'phc1-unit-1',
        title: 'Unit 1: Introduction to Pharmaceutical Chemistry',
        summary: 'Scope, objectives, and importance of pharmaceutical chemistry. Sources and types of errors.',
        content: 'Detailed content on the scope of pharmaceutical chemistry, its objectives in drug design and development, importance of purity standards, and different types of errors in analysis.',
        totalDownloads: 950,
        rating: 4
      },
      {
        id: 'phc1-unit-2',
        title: 'Unit 2: Acids, Bases, and Buffers',
        summary: 'Concepts of acidity, basicity, pH, pKa, and buffer systems in pharmaceutical preparations.',
        content: 'Covers Arrhenius, Brønsted-Lowry, and Lewis theories of acids and bases. pH, pKa, Henderson-Hasselbalch equation. Buffer solutions, buffer capacity, and their applications in pharmacy.',
        totalDownloads: 1020,
        rating: 5
      },
      {
        id: 'phc1-unit-3',
        title: 'Unit 3: Organic Chemistry Basics for Pharmacy',
        summary: 'Nomenclature, classification, and reactions of common organic functional groups relevant to pharmaceuticals.',
        content: ' IUPAC nomenclature of organic compounds. Classification and reactions of alkanes, alkenes, alkynes, alkyl halides, alcohols, ethers, aldehydes, ketones, carboxylic acids, and amines.',
        totalDownloads: 1100,
        rating: 4
      },
      {
        id: 'phc1-unit-4',
        title: 'Unit 4: Stereochemistry',
        summary: 'Isomerism, optical activity, chirality, enantiomers, diastereomers, and their significance in drug action.',
        content: 'Concept of isomerism. Structural isomerism. Stereoisomerism: optical isomerism, geometrical isomerism. Chirality, enantiomers, diastereomers, racemic mixtures. Importance of stereochemistry in drug efficacy and safety.',
        totalDownloads: 880,
        rating: 4
      },
      {
        id: 'phc1-unit-5',
        title: 'Unit 5: Quality Control of Pharmaceuticals',
        summary: 'Introduction to pharmacopoeias, sources of impurities, limit tests, and quality control parameters.',
        content: 'Pharmacopoeias (IP, BP, USP). Sources of impurities in pharmaceuticals. Limit tests for common impurities (chloride, sulfate, iron, arsenic, heavy metals). Basic quality control tests for tablets and capsules.',
        totalDownloads: 990,
        rating: 5
      }
    ]
  },
  {
    id: 'bpharm-pharmaceutics-1',
    title: 'Pharmaceutics I',
    category: 'B.Pharm',
    subject: 'Pharmaceutics',
    semester: 1,
    summary: 'Introduction to pharmaceutics, dosage forms, calculations, solid and liquid dosage forms, and pharmaceutical excipients.',
    imageUrl: 'https://placehold.co/600x400.png?text=Pharmaceutics',
    dataAiHint: 'pharmacy dosage',
    createdAt: '2023-11-05T14:00:00Z',
    units: [
      {
        id: 'phce1-unit-1',
        title: 'Unit 1: Introduction to Pharmaceutics & Dosage Forms',
        summary: 'History of pharmacy, scope of pharmaceutics, classification of dosage forms and routes of administration.',
        content: 'History and development of the pharmacy profession. Definition and scope of pharmaceutics. Classification of dosage forms (solid, liquid, semi-solid, gaseous). Routes of drug administration and their advantages/disadvantages.',
        totalDownloads: 1150,
        rating: 5
      },
      {
        id: 'phce1-unit-2',
        title: 'Unit 2: Pharmaceutical Calculations',
        summary: 'Weights and measures, percentage calculations, allegation, isotonic solutions, and dose calculations.',
        content: 'Systems of weights and measures (metric, imperial). Percentage calculations, ratio and proportion. Allegation method. Calculations for isotonic solutions. Dose calculations for adults and children.',
        totalDownloads: 1250,
        rating: 4
      },
      {
        id: 'phce1-unit-3',
        title: 'Unit 3: Solid Dosage Forms',
        summary: 'Detailed study of powders, tablets, capsules, their formulation, manufacturing, and evaluation.',
        content: 'Powders: classification, advantages, disadvantages, methods of preparation. Tablets: types, formulation, manufacturing methods (wet granulation, dry granulation, direct compression), evaluation. Capsules: hard and soft gelatin capsules, formulation, filling, evaluation.',
        totalDownloads: 1300,
        rating: 5
      },
      {
        id: 'phce1-unit-4',
        title: 'Unit 4: Liquid Dosage Forms',
        summary: 'Solutions, syrups, elixirs, suspensions, and emulsions: formulation, preparation, and stability.',
        content: 'Solutions: types, advantages, disadvantages, formulation. Syrups and elixirs. Suspensions: definition, advantages, disadvantages, formulation, evaluation. Emulsions: types, identification tests, formulation, stability.',
        totalDownloads: 1080,
        rating: 4
      },
      {
        id: 'phce1-unit-5',
        title: 'Unit 5: Pharmaceutical Excipients',
        summary: 'Classification and application of various excipients used in pharmaceutical formulations.',
        content: 'Definition and importance of excipients. Classification: diluents, binders, disintegrants, lubricants, glidants, coloring agents, flavoring agents, sweetening agents, preservatives, antioxidants, coating agents. Examples and applications.',
        totalDownloads: 920,
        rating: 3
      }
    ]
  },
  {
    id: 'bpharm-hap-1',
    title: 'Human Anatomy & Physiology I',
    category: 'B.Pharm',
    subject: 'Human Anatomy & Physiology',
    semester: 2,
    summary: 'Foundational concepts of the human body, cellular organization, tissues, and an introduction to various organ systems.',
    imageUrl: 'https://placehold.co/600x400.png?text=Anatomy+Physiology',
    dataAiHint: 'medical anatomy',
    createdAt: '2023-11-10T09:00:00Z',
    units: [
      {
        id: 'hap1-unit-1',
        title: 'Unit 1: Introduction to Human Body & Cellular Level of Organization',
        summary: 'Scope of anatomy and physiology, levels of structural organization, basic life processes, homeostasis. Cell structure and functions.',
        content: 'Definition and scope of anatomy and physiology. Levels of structural organization (chemical, cellular, tissue, organ, system, organismal). Basic life processes. Homeostasis. Structure of animal cell, functions of organelles, cell division (mitosis, meiosis).',
        totalDownloads: 1400,
        rating: 5
      },
      {
        id: 'hap1-unit-2',
        title: 'Unit 2: Tissues, Glandular, and Integumentary System',
        summary: 'Classification and functions of tissues. Exocrine and endocrine glands. Structure and functions of skin and its appendages.',
        content: 'Tissues: definition, classification (epithelial, connective, muscular, nervous), characteristics and functions of each type. Glands: exocrine and endocrine. Integumentary system: structure of skin (epidermis, dermis), functions of skin, accessory structures (hair, nails, glands).',
        totalDownloads: 1200,
        rating: 4
      },
      {
        id: 'hap1-unit-3',
        title: 'Unit 3: Skeletal System',
        summary: 'Types of bones, structure and functions of bones, axial and appendicular skeleton, joints.',
        content: 'Functions of the skeletal system. Classification of bones. Structure of a long bone. Axial skeleton (skull, vertebral column, thoracic cage). Appendicular skeleton (pectoral girdle, upper limbs, pelvic girdle, lower limbs). Joints: classification, structure, and types of movements.',
        totalDownloads: 1150,
        rating: 4
      },
      {
        id: 'hap1-unit-4',
        title: 'Unit 4: Muscular System',
        summary: 'Types of muscle tissue, structure of skeletal muscle, muscle contraction, and major skeletal muscles.',
        content: 'Types of muscle tissue (skeletal, smooth, cardiac). Structure of skeletal muscle. Mechanism of muscle contraction (sliding filament theory). Neuromuscular junction. Major skeletal muscles of the body (origin, insertion, action - selected examples).',
        totalDownloads: 1050,
        rating: 3
      },
      {
        id: 'hap1-unit-5',
        title: 'Unit 5: Nervous System (Part 1)',
        summary: 'Organization of the nervous system, neurons, neuroglia, nerve impulse, synapse, and central nervous system (brain and spinal cord overview).',
        content: 'Organization of the nervous system (CNS, PNS). Structure of neuron. Types of neurons and neuroglia. Nerve impulse: generation and conduction. Synapse and neurotransmitters. Overview of brain (major parts and functions) and spinal cord structure.',
        totalDownloads: 1300,
        rating: 5
      }
    ]
  }
];

export const mockVideos: Video[] = [
  {
    id: 'video-1',
    title: 'Understanding Quantum Entanglement',
    description: 'A deep dive into one of the most perplexing concepts in quantum mechanics.',
    thumbnailUrl: 'https://placehold.co/480x270.png?text=Quantum',
    dataAiHint: 'science technology',
    videoUrl: 'dQw4w9WgXcQ', // Example YouTube ID
    duration: '12:35',
    category: 'Physics',
    subject: 'Quantum Mechanics',
    uploader: 'Sci Explained',
    uploadDate: '2023-05-01T16:00:00Z',
  },
  {
    id: 'video-2',
    title: 'Mastering Python Data Structures',
    description: 'Learn about lists, dictionaries, sets, and tuples in Python with practical examples.',
    thumbnailUrl: 'https://placehold.co/480x270.png?text=Python',
    dataAiHint: 'programming code',
    videoUrl: 'L_o_O_54gI', // Example YouTube ID
    duration: '25:10',
    category: 'Computer Science',
    subject: 'Python Programming',
    uploader: 'Code Master',
    uploadDate: '2023-06-15T10:20:00Z',
  },
  {
    id: 'video-3',
    title: 'The Art of Storytelling',
    description: 'Techniques and tips for crafting compelling narratives in writing and speech.',
    thumbnailUrl: 'https://placehold.co/480x270.png?text=Storytelling',
    dataAiHint: 'writing creativity',
    videoUrl: 'Rok5wihr_DM', // Example YouTube ID
    duration: '18:42',
    category: 'Literature & Writing',
    subject: 'Creative Writing',
    uploader: 'Narrative Craft',
    uploadDate: '2023-07-02T13:00:00Z',
  },
];

export const mockUserProfile: UserProfile = {
  id: 'user-123',
  name: 'Alex Student',
  email: 'alex.student@example.com',
  avatarUrl: 'https://placehold.co/100x100.png?text=AS',
  dataAiHint: 'profile avatar',
  subscriptionStatus: 'Premium',
  isEmailVerified: false,
  joinDate: '2022-08-15T00:00:00Z',
  recentlyViewed: [
    { id: 'note-1', type: 'note', title: 'Introduction to Calculus', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'video-2', type: 'video', title: 'Mastering Python Data Structures', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()  },
    { id: 'note-3', type: 'note', title: 'Cellular Respiration', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()  },
  ],
};

// Helper function to get image with data-ai-hint
export function getPlaceholderImage(width: number, height: number, text: string, hint: string) {
  return {
    src: `https://placehold.co/${width}x${height}.png?text=${encodeURIComponent(text)}`,
    alt: text,
    "data-ai-hint": hint,
  };
}

