# eDC Launchpad - Knowledge Base Rethink
**Technology Vertical Recruitment Task 2026**

---

## 1. Problem Being Solved
The existing eDC Knowledge Base exists as a static, disorganized Notion folder. It fails because:
*   **Zero Engagement:** It lacks interactive elements, feeling like a passive repository rather than a dynamic product.
*   **Poor Discovery:** Users must manually sift through unstructured data to find actionable value.
*   **No Retention Loop:** There is no compelling hook to bring a user back once they close the tab.
*   **Lack of Identity:** A generic template that fails to inspire or represent the prestige and energy of the IIT Delhi entrepreneurial ecosystem.
*   **High Resource Utilization:** The site felt laggy, which ruined user retention.

---

## 2. Target Users
IIT Delhi students spanning three stages: **The Explorer** (curious, seeking knowledge), **The Builder** (has an idea, needs campus resources), and **The Fundseeker** (pitch-ready, seeking capital).

---

## 3. Key Assumptions
1. **Structure Over Volume:** Users prefer a guided, step-by-step path rather than an overwhelming dump of links. 
2. **Motivation Through Gamification:** Implementing a progress-tracking framework (XP, Leaderboards) will intrinsically motivate students to consume content and take real-world actions.
3. **Aesthetic Matters:** A premium design compared to previous monotonous design.
4. **Action Over Reading:** Users want to *do* things—book mentorships, apply for funds, register for events—not just read about them.

---

## 4. Design and Key Decisions

### Structure of the Site
*   **Dashboard:** The site greets the user in the first tile, and below is the quick navigation section for the explore section. Also, the dashboard shows the current approaching deadlines so that the user doesn't miss any deadlines.
*   **Core Sections:** The site is divided mainly into 4 sections: **Explore**, **Launch**, **Fund**, and **News**.

### Explore Section
*   Built for new users who want to explore startups or conduct market research. 
*   Currently includes the books and YouTube podcasts found on the legacy Notion page.
*   Future iterations can integrate more courses or market reports.
*   Each book and podcast features a summary and is divided into different tags so they can be easily browsed according to the niche.
*   Integrated a functional search bar.
*   For podcasts (which were mostly YouTube videos), opening a tile brings up an interface containing a summary of the podcast alongside an integrated YouTube video player for easy viewing. Various tags are implemented within the summary for the aforementioned searchability.
*   Implemented the front end of a leaderboard system to motivate users to learn by seeing others on the leaderboard.
*   The basic idea for this page was to create a one-stop solution for all learning resources.

### Launch Section
*   A one-stop solution for all the technical hurdles a startup faces.
*   The vision for this page is that whenever a person faces difficulties in their startup journey, they can come to this page.
*   The first section highlights campus resources they can access, currently featuring:
    *   Makerspace
    *   R&D opportunities with professors in labs
    *   HPC (High-Performance Computing) accessibility
    *   Web and other tech resources: Connects users with students possessing relevant technical skills like website building or AI/ML, which are necessary for a startup.
*   The lower section highlights faculty members available for specialized help in more advanced fields. Currently, a few faculty names are added, with room to scale as more data becomes available.
*   At the bottom, IITD alumni from various fields are listed, whom users can contact to get industrial insights. Direct links to their LinkedIn profiles and websites are present.
*   Future iterations can include contact details for the Points of Contact (PoCs) of different campus clubs to enable specific consultations with experienced individuals.

### Fund Section
*   The vision of this tab is to help users gather the required funds for their ideas.
*   Features deadlines for upcoming YC (Y Combinator) or other incubation events through which users can secure funding.
*   Includes an option to schedule a meeting or connect with eDC for funding, allowing eDC to evaluate the idea and decide on the next steps.
*   Contains a database of all government schemes or other opportunities available to secure funding.
*   Added a front-end placeholder for a default pitch deck slide template (not currently wired up to a backend).

### News Section
*   The vision of this tab is to be a one-stop solution for all happenings around the campus and across the global startup ecosystem.
*   Currently features a few news articles fetched from the IITD website.
*   The news is categorized into various sections according to tags.
*   The top section covers major headlines.
*   Includes a dedicated section for upcoming eDC events where users can register.
*   Future features could include a curated feed tailored to personal interests or content aggregated from other platforms like Reddit.
*   This dynamic hub serves as a weekly hook to drive user return loops.

> **Note on Navigation:** There is a persistent option to connect with an eDC mentor on the left panel for direct mentorship access.

### Visual Identity & Architecture
*   **Visual Identity (Vibrant Architectural):** Completely overhauled the legacy glassmorphism into a High-Contrast, Modern design language. Utilized a precise palette: Off-White/Neutral surfaces to reduce eye fatigue, Deep Jet (`#282B2B`) for structural definition, vibrant Orange (`#EE6C29`) for focal points and primary actions, and Moonstone (`#7AA6B3`) for secondary balance.
*   **Depth & Elevation:** Eliminated heavy shadows and blurs. Relied entirely on tonal layers and crisp 1px borders (at low opacity) to define cards and inputs, echoing architectural blueprints.
*   **Theme Adaptability:** Engineered a persistent, fully integrated Dark/Light mode toggle that flips the entire CSS variable ecosystem flawlessly, respecting user preference and accessibility.

---

## 5. Feature Prioritization
1. **The XP & Leaderboard Engine:** Solves the retention crisis. Every valuable action (reading a book, booking a mentorship, registering for Makerspace) rewards XP. A compact leaderboard is injected directly into the persistent sidebar to drive competitive engagement.
2. **Action Pipelines (Launch & Fund):** Restructured abstract information into actionable funnels. Users can explicitly see requirements for institutional connects (i-TTO, HPC) and direct avenues for VC pipelines.
3. **Dynamic Content Hub (News/Events):** Implemented a centralized dashboard for upcoming events and campus startup news, complete with interactive bookmarking to give users a reason to check back weekly.
4. **Persistent Navigation:** Built a stateful, universally injected left-hand sidebar so the user always has situational awareness and one-click access to core verticals.
5. **Lightning-Fast Architecture:** Built a static website optimized for speed, ready to be wired up to a backend to connect users with eDC directly.

---

## 6. Overall Approach
I approached this challenge by shifting the paradigm from a **"Resource Folder"** to an **"Action-Oriented Launchpad"**. 

Technically, I opted for a lightning-fast, static architecture supercharged by modular Vanilla JS (`xp.js`) and a highly scalable, CSS-variable-driven design system (`style.css`). This ensures maximum performance without framework overhead.

By prioritizing user psychology (gamification), aesthetic excellence (Vibrant Architectural System), and actionable workflows (Mentorship & Funding forms), the resulting product is not just a place to find links—it is a mission control center that IIT Delhi students will actually *want* to use.