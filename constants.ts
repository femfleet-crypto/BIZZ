import type { Curriculum } from './types';

export const CURRICULUM: Curriculum = {
  "Economics": {
    "1st PUC": [
      // Part A: Statistics for Economics
      { id: "e1c1", title: "Chapter 1: Introduction", topics: [
        { id: "e1c1t1", title: "1.1 Introduction to Economics" },
        { id: "e1c1t2", title: "1.2 Statistics in Economics" },
        { id: "e1c1t3", title: "1.3 Meaning of Statistics" },
        { id: "e1c1t4", title: "1.4 Importance of Statistics" }
      ]},
      { id: "e1c2", title: "Chapter 2: Collection and Organisation of Data", topics: [
        { id: "e1c2t1", title: "2.1 Introduction" },
        { id: "e1c2t2", title: "2.2 Types of Data (Primary and Secondary)" },
        { id: "e1c2t3", title: "2.3 Survey - census and sample survey, censes of India, NSSO, CSO, CMIE." },
        { id: "e1c2t4", title: "2.4 Introduction to organization of Data" },
        { id: "e1c2t5", title: "2.5 Raw data and classified data." },
        { id: "e1c2t6", title: "2.6 Classification of data." },
        { id: "e1c2t7", title: "2.7 Variables: Continuous and Discrete" },
        { id: "e1c2t8", title: "2.8 Frequency distribution" }
      ]},
      { id: "e1c3", title: "Chapter 3: Presentation of Data", topics: [
        { id: "e1c3t1", title: "3.1 Introduction" },
        { id: "e1c3t2", title: "3.2 Textual presentation of Data" },
        { id: "e1c3t3", title: "3.3 Tabular presentation of data" },
        { id: "e1c3t4", title: "3.4 Tabulation of data and parts of a Table." },
        { id: "e1c3t5", title: "3.5 Diagrammatic Presentation (Bar, Pie)" },
        { id: "e1c3t6", title: "3.6 Graphic presentation of Data (Histogram, Polygon, Ogive)" }
      ]},
      { id: "e1c4", title: "Chapter 4: Measures of central tendency", hasFormulas: true, topics: [
        { id: "e1c4t1", title: "4.1 Introduction to Central Tendency" },
        { id: "e1c4t2", title: "4.2 Arithmetic mean (Simple and Weighted)" },
        { id: "e1c4t3", title: "4.3 Median and its calculation" },
        { id: "e1c4t4", title: "4.4 Mode and its calculation" },
        { id: "e1c4t5", title: "4.5 Positional Averages: Quartiles, Deciles, Percentiles" },
        { id: "e1c4t6", title: "4.6 Comparison of Mean, Median and Mode" }
      ]},
      { id: "e1c5", title: "Chapter 5: Index Numbers", hasFormulas: true, topics: [
        { id: "e1c5t1", title: "5.1 Introduction to Index Numbers" },
        { id: "e1c5t2", title: "5.2 Meaning and importance of Index numbers" },
        { id: "e1c5t3", title: "5.3 Types of Index Numbers" },
        { id: "e1c5t4", title: "5.4 Construction of Index Numbers (Simple and Weighted)" },
        { id: "e1c5t5", title: "5.5 Issues in constructing Index Numbers" },
        { id: "e1c5t6", title: "5.6 Important Index Numbers CPI, WPI, IIP and SENSEX." }
      ]},
      // Part B: Indian Economic Development
      { id: "e1c6", title: "Chapter 6: Economic Reforms since 1991", topics: [
        { id: "e1c6t1", title: "6.1 Introduction" },
        { id: "e1c6t2", title: "6.2 Background: The crisis of 1991" },
        { id: "e1c6t3", title: "6.3 Liberalisation" },
        { id: "e1c6t4", title: "6.4 Privatisation" },
        { id: "e1c6t5", title: "6.5 Globalisation" },
        { id: "e1c6t6", title: "6.6 Indian economy during reforms: an assessment." }
      ]},
      { id: "e1c7", title: "Chapter 7: Poverty", topics: [
        { id: "e1c7t1", title: "7.1 Introduction" },
        { id: "e1c7t2", title: "7.2 Identification of poor: Absolute and Relative Poverty" },
        { id: "e1c7t3", title: "7.3 Number of poor in India." },
        { id: "e1c7t4", title: "7.4 Causes of poverty" },
        { id: "e1c7t5", title: "7.5 Policies and programmes towards poverty alleviation" },
        { id: "e1c7t6", title: "7.6 A critical evaluation of poverty alleviation programs" }
      ]},
      { id: "e1c8", title: "Chapter 8: Human Capital formation in India", topics: [
        { id: "e1c8t1", title: "8.1 Introduction" },
        { id: "e1c8t2", title: "8.2 Meaning of Human Capital formation" },
        { id: "e1c8t3", title: "8.3 Sources of Human capital formation" },
        { id: "e1c8t4", title: "8.4 Human capital formation and economic growth." },
        { id: "e1c8t5", title: "8.5 State of Human capital formation in India" },
        { id: "e1c8t6", title: "8.6 Education sector in India." },
        { id: "e1c8t7", title: "8.7 Future prosperity." }
      ]},
      { id: "e1c9", title: "Chapter 9: Rural development", topics: [
        { id: "e1c9t1", title: "9.1 Introduction" },
        { id: "e1c9t2", title: "9.2 Meaning of Rural development and its key issues" },
        { id: "e1c9t3", title: "9.3 Rural credit: Sources and Challenges" },
        { id: "e1c9t4", title: "9.4 Agricultural marketing system and its defects" },
        { id: "e1c9t5", title: "9.5 Agricultural diversification and its importance" },
        { id: "e1c9t6", title: "9.6 Organic farming: Benefits and Challenges" }
      ]},
      { id: "e1c10", title: "Chapter 10: Employment Growth, Informalisation and other issues", topics: [
        { id: "e1c10t1", title: "10.1 Introduction" },
        { id: "e1c10t2", title: "10.2 Workers and Employment" },
        { id: "e1c10t3", title: "10.3 Labourforce and employment" },
        { id: "e1c10t4", title: "10.4 Classification of workforce (Formal/Informal)" },
        { id: "e1c10t5", title: "10.5 Sector-wise employment structure (Primary, Secondary, Tertiary)" },
        { id: "e1c10t6", title: "10.6 Growth and changing structure of employment" },
        { id: "e1c10t7", title: "10.7 Informalisation of employment" },
        { id: "e1c10t8", title: "10.8 Unemployment meaning and types" },
        { id: "e1c10t9", title: "10.9 Government and employment generation" }
      ]},
      { id: "e1c11", title: "Chapter 11: Infrastructure", topics: [
        { id: "e1c11t1", title: "11.1 Introduction" },
        { id: "e1c11t2", title: "11.2 Meaning and types of Infrastructure (Economic & Social)" },
        { id: "e1c11t3", title: "11.3 Relevance of Infrastructure" },
        { id: "e1c11t4", title: "11.4 Health Infrastructure" },
        { id: "e1c11t5", title: "11.5 Energy Infrastructure" },
        { id: "e1c11t6", title: "11.6 State of Infrastructure in India" }
      ]},
      { id: "e1c12", title: "Chapter 12: Environment and sustainable Development", topics: [
        { id: "e1c12t1", title: "12.1 Introduction" },
        { id: "e1c12t2", title: "12.2 Environment meaning and function." },
        { id: "e1c12t3", title: "12.3 State of India's environment" },
        { id: "e1c12t4", title: "12.4 Sustainable development: Concept and Importance" },
        { id: "e1c12t5", title: "12.5 Strategies for sustainable development" }
      ]}
    ],
    "2nd PUC": [
      // Part A: Microeconomics
      { id: "e2c1", title: "Chapter 1: Introduction to Microeconomics", topics: [
        { id: "e2c1t1", title: "A Simple Economy" },
        { id: "e2c1t2", title: "Central Problems of an Economy" },
        { id: "e2c1t3", title: "Organisation of Economic Activities" },
        { id: "e2c1t4", title: "The Centrally Planned Economy" },
        { id: "e2c1t5", title: "The Market Economy" },
        { id: "e2c1t6", title: "Positive and Normative Economics" },
        { id: "e2c1t7", title: "Microeconomics and Macroeconomics" }
      ]},
      { id: "e2c2", title: "Chapter 2: Theory of Consumer Behaviour", topics: [
        { id: "e2c2t1", title: "Utility: Cardinal and Ordinal Utility Analysis" },
        { id: "e2c2t2", title: "The Law of Diminishing Marginal Utility" },
        { id: "e2c2t3", title: "Indifference Curve Analysis" },
        { id: "e2c2t4", title: "The Consumer's Budget: Budget Set and Budget Line" },
        { id: "e2c2t5", title: "Optimal Choice of the Consumer" },
        { id: "e2c2t6", title: "Demand: Demand Curve and the Law of Demand" },
        { id: "e2c2t7", title: "Determinants of Demand" },
        { id: "e2c2t8", title: "Shifts in the Demand Curve" },
        { id: "e2c2t9", title: "Market Demand" },
        { id: "e2c2t10", title: "Elasticity of Demand" }
      ]},
      { id: "e2c3", title: "Chapter 3: Production and Costs", hasFormulas: true, topics: [
        { id: "e2c3t1", title: "The Production Function: TP, AP, MP" },
        { id: "e2c3t2", title: "The Law of Variable Proportions" },
        { id: "e2c3t3", title: "Returns to Scale" },
        { id: "e2c3t4", title: "Costs: An Introduction" },
        { id: "e2c3t5", title: "Short Run Costs: TFC, TVC, TC" },
        { id: "e2c3t6", title: "Short Run Costs: AFC, AVC, AC" },
        { id: "e2c3t7", title: "Short Run Marginal Cost (MC)" },
        { id: "e2c3t8", title: "Shapes of Short Run Cost Curves" },
        { id: "e2c3t9", title: "Long Run Costs" }
      ]},
      { id: "e2c4", title: "Chapter 4: The Theory of the Firm under Perfect Competition", hasFormulas: true, topics: [
        { id: "e2c4t1", title: "Perfect Competition: Features" },
        { id: "e2c4t2", title: "Revenue: TR, AR, MR" },
        { id: "e2c4t3", title: "Profit Maximization Conditions" },
        { id: "e2c4t4", title: "The Supply Curve of a Firm" },
        { id: "e2c4t5", title: "Determinants of a Firm's Supply Curve" },
        { id: "e2c4t6", title: "Market Supply Curve" },
        { id: "e2c4t7", title: "Price Elasticity of Supply" }
      ]},
      { id: "e2c5", title: "Chapter 5: Market Equilibrium", topics: [
        { id: "e2c5t1", title: "Equilibrium, Excess Demand, Excess Supply" },
        { id: "e2c5t2", title: "Market Equilibrium with Fixed Number of Firms" },
        { id: "e2c5t3", title: "Market Equilibrium with Free Entry and Exit" },
        { id: "e2c5t4", title: "Shifts in Demand and Supply" },
        { id: "e2c5t5", title: "Applications: Price Ceiling and Price Floor" }
      ]},
      { id: "e2c6", title: "Chapter 6: Non-Competitive Markets", topics: [
        { id: "e2c6t1", title: "Simple Monopoly in the Commodity Market" },
        { id: "e2c6t2", title: "Market Structure of Monopoly" },
        { id: "e2c6t3", title: "Profit Maximisation in Monopoly" },
        { id: "e2c6t4", title: "Other Non-perfectly Competitive Markets" },
        { id: "e2c6t5", title: "Monopolistic Competition" },
        { id: "e2c6t6", title: "Oligopoly" }
      ]},
      // Part B: Macroeconomics
      { id: "e2c7", title: "Chapter 7: Introduction to Macroeconomics", topics: [
        { id: "e2c7t1", title: "Emergence of Macroeconomics" },
        { id: "e2c7t2", title: "Context of Macroeconomics" },
        { id: "e2c7t3", title: "Basic Concepts: Consumption, Capital, Final, Intermediate Goods" },
        { id: "e2c7t4", title: "Stocks and Flows" },
        { id: "e2c7t5", title: "Circular Flow of Income (Two-sector model)" }
      ]},
      { id: "e2c8", title: "Chapter 8: National Income Accounting", hasFormulas: true, topics: [
        { id: "e2c8t1", title: "Methods of Calculating National Income" },
        { id: "e2c8t2", title: "Product or Value Added Method" },
        { id: "e2c8t3", title: "Expenditure Method" },
        { id: "e2c8t4", title: "Income Method" },
        { id: "e2c8t5", title: "Some Macroeconomic Identities (GDP, GNP, NNP, NDP)" },
        { id: "e2c8t6", title: "Nominal and Real GDP" },
        { id: "e2c8t7", title: "GDP and Welfare" }
      ]},
      { id: "e2c9", title: "Chapter 9: Money and Banking", topics: [
        { id: "e2c9t1", title: "Barter System and its Difficulties" },
        { id: "e2c9t2", title: "Functions of Money" },
        { id: "e2c9t3", title: "Demand for and Supply of Money" },
        { id: "e2c9t4", title: "Money Creation by Banking System" },
        { id: "e2c9t5", title: "Role of the Central Bank (RBI)" },
        { id: "e2c9t6", title: "Policy Tools to Control Money Supply" }
      ]},
      { id: "e2c10", title: "Chapter 10: Determination of Income and Employment", hasFormulas: true, topics: [
        { id: "e2c10t1", title: "Aggregate Demand and its Components" },
        { id: "e2c10t2", title: "Consumption Function and Propensity to Consume" },
        { id: "e2c10t3", title: "Investment Function" },
        { id: "e2c10t4", title: "Determination of Equilibrium Income" },
        { id: "e2c10t5", title: "Investment Multiplier and its Mechanism" },
        { id: "e2c10t6", title: "Paradox of Thrift" }
      ]},
      { id: "e2c11", title: "Chapter 11: Government Budget and the Economy", hasFormulas: true, topics: [
        { id: "e2c11t1", title: "Objectives of Government Budget" },
        { id: "e2c11t2", title: "Components of the Government Budget" },
        { id: "e2c11t3", title: "Classification of Receipts and Expenditure" },
        { id: "e2c11t4", title: "Measures of Government Deficit" },
        { id: "e2c11t5", title: "Fiscal, Revenue, and Primary Deficits" },
        { id: "e2c11t6", title: "Fiscal Policy" }
      ]},
      { id: "e2c12", title: "Chapter 12: Open Economy Macroeconomics", hasFormulas: true, topics: [
        { id: "e2c12t1", title: "Balance of Payments: Meaning and Components" },
        { id: "e2c12t2", title: "Current Account and Capital Account" },
        { id: "e2c12t3", title: "The Foreign Exchange Market" },
        { id: "e2c12t4", title: "Nominal and Real Exchange Rates" },
        { id: "e2c12t5", title: "Exchange Rate Determination" },
        { id: "e2c12t6", title: "Flexible vs Fixed Exchange Rate Systems" },
        { id: "e2c12t7", title: "Managed Floating Exchange Rate System" }
      ]},
    ]
  },
  "Business Studies": {
    "1st PUC": [
      { id: "b1c1", title: "Chapter 1: Business, Trade and Commerce", topics: [
          { id: "b1c1t1", title: "History of Trade and Commerce" },
          { id: "b1c1t2", title: "Concept and Characteristics of Business" },
          { id: "b1c1t3", title: "Business, Profession and Employment" },
          { id: "b1c1t4", title: "Objectives of Business" },
          { id: "b1c1t5", title: "Classification of Business Activities" },
          { id: "b1c1t6", title: "Role of Business in the Development of Economy" },
          { id: "b1c1t7", title: "Business Risks: Nature and Causes" },
          { id: "b1c1t8", title: "Basic Factors for Starting a Business" }
      ]},
      { id: "b1c2", title: "Chapter 2: Forms of Business Organisation", topics: [
          { id: "b1c2t1", title: "Sole Proprietorship: Features, Merits, Limitations" },
          { id: "b1c2t2", title: "Joint Hindu Family Business" },
          { id: "b1c2t3", title: "Partnership: Features, Merits, Limitations" },
          { id: "b1c2t4", title: "Types of Partners and Partnership Deed" },
          { id: "b1c2t5", title: "Cooperative Societies: Features, Types" },
          { id: "b1c2t6", title: "Joint Stock Company: Features, Types" },
          { id: "b1c2t7", title: "Choice of Form of Business Organisation" }
      ]},
      { id: "b1c3", title: "Chapter 3: Private, Public and Global Enterprises", topics: [
          { id: "b1c3t1", title: "Private Sector and Public Sector" },
          { id: "b1c3t2", title: "Forms of organising Public Sector Enterprises" },
          { id: "b1c3t3", title: "Departmental Undertakings" },
          { id: "b1c3t4", title: "Statutory Corporations" },
          { id: "b1c3t5", title: "Government Company" },
          { id: "b1c3t6", title: "Global Enterprises (MNCs)" },
          { id: "b1c3t7", title: "Joint Ventures and Public Private Partnership (PPP)" }
      ]},
      { id: "b1c4", title: "Chapter 4: Business Services", topics: [
          { id: "b1c4t1", title: "Nature and Types of Business Services" },
          { id: "b1c4t2", title: "Banking and its Functions" },
          { id: "b1c4t3", title: "Types of Bank Accounts and e-Banking" },
          { id: "b1c4t4", title: "Insurance: Principles and Types" },
          { id: "b1c4t5", title: "Life, Health, Fire, and Marine Insurance" },
          { id: "b1c4t6", title: "Postal and Telecom Services" },
          { id: "b1c4t7", title: "Warehousing: Types and Functions" }
      ]},
      { id: "b1c5", title: "Chapter 5: Emerging Modes of Business", topics: [
          { id: "b1c5t1", title: "e-Business: Scope and Benefits" },
          { id: "b1c5t2", title: "e-Business vs e-Commerce" },
          { id: "b1c5t3", title: "Online Transactions and e-Business Risks" },
          { id: "b1c5t4", title: "Outsourcing: Concept, Need, Scope" },
          { id: "b1c5t5", title: "Business Process Outsourcing (BPO) and KPO" }
      ]},
      { id: "b1c6", title: "Chapter 6: Social Responsibilities of Business and Business Ethics", topics: [
          { id: "b1c6t1", title: "Concept and Need for Social Responsibility" },
          { id: "b1c6t2", title: "Kinds of Social Responsibility" },
          { id: "b1c6t3", title: "Social Responsibility towards different interest groups" },
          { id: "b1c6t4", title: "Business and Environmental Protection" },
          { id: "b1c6t5", title: "Business Ethics: Concept and Elements" }
      ]},
      { id: "b1c7", title: "Chapter 7: Formation of a Company", topics: [
          { id: "b1c7t1", title: "Stages in Company Formation" },
          { id: "b1c7t2", title: "Stage 1: Promotion of a Company" },
          { id: "b1c7t3", title: "Stage 2: Incorporation" },
          { id: "b1c7t4", title: "Important Documents: MoA, AoA, Prospectus" },
          { id: "b1c7t5", title: "Stage 3: Capital Subscription & Commencement of Business" }
      ]},
      { id: "b1c8", title: "Chapter 8: Sources of Business Finance", topics: [
          { id: "b1c8t1", title: "Meaning, Nature and Significance of Business Finance" },
          { id: "b1c8t2", title: "Sources of Funds (Owner's vs Borrowed)" },
          { id: "b1c8t3", title: "Retained Earnings" },
          { id: "b1c8t4", title: "Trade Credit, Public Deposits, Lease Financing" },
          { id: "b1c8t5", title: "Methods of Raising Finance (Shares, Debentures, Loans)" },
          { id: "b1c8t6", title: "International Sources of Finance (GDR, ADR, FCCB)" },
          { id: "b1c8t7", title: "Factors Affecting the Choice of Source of Funds" }
      ]},
      { id: "b1c9", title: "Chapter 9: MSME and Business Entrepreneurship", topics: [
          { id: "b1c9t1", title: "Micro, Small and Medium Enterprises (MSME)" },
          { id: "b1c9t2", title: "Role of MSME in India and its Problems" },
          { id: "b1c9t3", title: "Government assistance to MSME" },
          { id: "b1c9t4", title: "Entrepreneurship Development: Concept & Need" },
          { id: "b1c9t5", title: "Startup India Scheme" },
          { id: "b1c9t6", title: "Intellectual Property Rights (IPR)" }
      ]},
      { id: "b1c10", title: "Chapter 10: Internal Trade", topics: [
          { id: "b1c10t1", title: "Meaning and Types of Internal Trade" },
          { id: "b1c10t2", title: "Wholesale Trade: Services of Wholesalers" },
          { id: "b1c10t3", title: "Retail Trade: Services of Retailers" },
          { id: "b1c10t4", title: "Types of Retailers: Itinerant and Fixed Shop" },
          { id: "b1c10t5", title: "Role of Chambers of Commerce and Industry" },
          { id: "b1c10t6", title: "Goods and Services Tax (GST)" }
      ]},
      { id: "b1c11", title: "Chapter 11: International Business", topics: [
          { id: "b1c11t1", title: "Meaning, Reasons, and Scope" },
          { id: "b1c11t2", title: "International vs Domestic Business" },
          { id: "b1c11t3", title: "Modes of Entry into International Business" },
          { id: "b1c11t4", title: "Export and Import Procedures" },
          { id: "b1c11t5", title: "Documents involved in International Trade" },
          { id: "b1c11t6", title: "Foreign Trade Promotion Measures and Schemes" },
          { id: "b1c11t7", title: "World Trade Organisation (WTO)" }
      ]}
    ],
    "2nd PUC": [
      { id: "b2c1", title: "Chapter 1: Nature and Significance of Management", topics: [
          { id: "b2c1t1", title: "Management - Concept, Objectives, and Importance" },
          { id: "b2c1t2", title: "Characteristics of Management" },
          { id: "b2c1t3", title: "Management as Art, Science and Profession" },
          { id: "b2c1t4", title: "Levels of Management" },
          { id: "b2c1t5", title: "Functions of Management" },
          { id: "b2c1t6", title: "Coordination - The Essence of Management" }
      ]},
      { id: "b2c2", title: "Chapter 2: Principles of Management", topics: [
          { id: "b2c2t1", title: "Principles of Management: Concept & Significance" },
          { id: "b2c2t2", title: "Nature of Principles of Management" },
          { id: "b2c2t3", title: "Fayol's 14 Principles of Management" },
          { id: "b2c2t4", title: "Taylor's Scientific Management: Principles" },
          { id: "b2c2t5", title: "Taylor's Scientific Management: Techniques" },
          { id: "b2c2t6", title: "Comparison of Taylor and Fayol's contributions" }
      ]},
      { id: "b2c3", title: "Chapter 3: Business Environment", topics: [
          { id: "b2c3t1", title: "Business Environment: Meaning and Importance" },
          { id: "b2c3t2", title: "Features of Business Environment" },
          { id: "b2c3t3", title: "Dimensions of Business Environment" },
          { id: "b2c3t4", title: "Economic Environment in India" },
          { id: "b2c3t5", title: "Impact of Government Policy Changes on Business (LPG)" }
      ]},
      { id: "b2c4", title: "Chapter 4: Planning", topics: [
          { id: "b2c4t1", title: "Meaning, Features, Importance and Limitations" },
          { id: "b2c4t2", title: "Planning Process" },
          { id: "b2c4t3", title: "Types of Plans: Single-use and Standing Plans" },
          { id: "b2c4t4", title: "Objectives, Strategy, Policy, Procedure, Method, Rule, Budget, Programme" }
      ]},
      { id: "b2c5", title: "Chapter 5: Organising", topics: [
          { id: "b2c5t1", title: "Meaning, Process and Importance" },
          { id: "b2c5t2", title: "Organisation Structure: Functional and Divisional" },
          { id: "b2c5t3", title: "Formal and Informal Organisation" },
          { id: "b2c5t4", title: "Delegation: Elements and Importance" },
          { id: "b2c5t5", title: "Decentralisation: Concept and Importance" }
      ]},
      { id: "b2c6", title: "Chapter 6: Staffing", topics: [
          { id: "b2c6t1", title: "Meaning, Need and Importance of Staffing" },
          { id: "b2c6t2", title: "Staffing as a Part of Human Resource Management" },
          { id: "b2c6t3", title: "Staffing Process" },
          { id: "b2c6t4", title: "Recruitment: Sources (Internal/External)" },
          { id: "b2c6t5", title: "Selection: Process" },
          { id: "b2c6t6", title: "Training and Development: Importance and Methods" }
      ]},
      { id: "b2c7", title: "Chapter 7: Directing", topics: [
          { id: "b2c7t1", title: "Meaning, Principles and Importance" },
          { id: "b2c7t2", title: "Elements of Directing" },
          { id: "b2c7t3", title: "Supervision" },
          { id: "b2c7t4", title: "Motivation: Maslow's Need Hierarchy Theory" },
          { id: "b2c7t5", title: "Financial and Non-financial Incentives" },
          { id: "b2c7t6", title: "Leadership: Qualities of a good leader" },
          { id: "b2c7t7", title: "Communication: Formal and Informal" }
      ]},
      { id: "b2c8", title: "Chapter 8: Controlling", topics: [
          { id: "b2c8t1", title: "Meaning and Importance" },
          { id: "b2c8t2", title: "Relationship between Planning and Controlling" },
          { id: "b2c8t3", title: "Controlling Process" },
          { id: "b2c8t4", title: "Techniques of Managerial Control: Traditional" },
          { id: "b2c8t5", title: "Techniques of Managerial Control: Modern" }
      ]},
      { id: "b2c9", title: "Chapter 9: Financial Management", topics: [
          { id: "b2c9t1", title: "Meaning, Role, and Objectives" },
          { id: "b2c9t2", title: "Financial Decisions: Investment, Financing, Dividend" },
          { id: "b2c9t3", title: "Financial Planning: Concept and Importance" },
          { id: "b2c9t4", title: "Capital Structure: Concept and Factors" },
          { id: "b2c9t5", title: "Fixed Capital: Concept and Factors" },
          { id: "b2c9t6", title: "Working Capital: Concept and Factors" }
      ]},
      { id: "b2c10", title: "Chapter 10: Marketing", topics: [
          { id: "b2c10t1", title: "Marketing vs Selling" },
          { id: "b2c10t2", title: "Marketing Philosophies and Functions" },
          { id: "b2c10t3", title: "Marketing Mix: The 4 Ps" },
          { id: "b2c10t4", title: "Product Mix: Branding, Labelling, Packaging" },
          { id: "b2c10t5", title: "Price Mix: Factors affecting price" },
          { id: "b2c10t6", title: "Place Mix (Physical Distribution): Channels" },
          { id: "b2c10t7", title: "Promotion Mix: Advertising, Sales Promotion, Personal Selling, Public Relations" }
      ]},
      { id: "b2c11", title: "Chapter 11: Consumer Protection", topics: [
          { id: "b2c11t1", title: "Importance of Consumer Protection" },
          { id: "b2c11t2", title: "The Consumer Protection Act, 2019" },
          { id: "b2c11t3", title: "Consumer Rights and Responsibilities" },
          { id: "b2c11t4", title: "Ways and Means of Consumer Protection" },
          { id: "b2c11t5", title: "Redressal Agencies under CPA" },
          { id: "b2c11t6", title: "Role of Consumer Organisations and NGOs" }
      ]}
    ]
  }
};