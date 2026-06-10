# eDC Launchpad - Knowledge Base Rethink
**Technology Vertical Recruitment Task 2026**

## 1. Problem Being Solved
The existing eDC Knowledge Base exists as a static, disorganized Notion folder. It fails because:
- **Zero Engagement:** It lacks interactive elements, feeling like a passive repository rather than a dynamic product.
- **Poor Discovery:** Users must manually sift through unstructured data to find actionable value.
- **No Retention Loop:** There is no compelling hook to bring a user back once they close the tab.
- **Lack of Identity:** A generic template that fails to inspire or represent the prestige and energy of the IIT Delhi entrepreneurial ecosystem.

## 2. Target Users
IIT Delhi students spanning all stages of the entrepreneurial journey—from curious freshmen to active founders seeking acceleration. These users are highly analytical, time-constrained, and heavily saturated with digital tools. They need high-signal information delivered in a structured, actionable, and visually stimulating way.

## 3. Key Assumptions
1. **Structure Over Volume:** Users prefer a guided, step-by-step path rather than an overwhelming dump of links. 
2. **Motivation Through Gamification:** Implementing a progress-tracking framework (XP, Leaderboards) will intrinsically motivate students to consume content and take real-world actions.
3. **Aesthetic Matters:** A premium, "vibrant architectural" design system resonates deeply with engineering students, conveying precision, energy, and professionalism.
4. **Action over Reading:** Users want to *do* things—book mentorships, apply for funds, register for events—not just read about them.

## 4. Design Decisions
- **Visual Identity (Vibrant Architectural):** Completely overhauled the legacy glassmorphism into a High-Contrast, Modern design language. I utilized a precise palette: Off-White/Neutral surfaces to reduce eye fatigue, Deep Jet (`#282B2B`) for structural definition, vibrant Orange (`#EE6C29`) for focal points and primary actions, and Moonstone (`#7AA6B3`) for secondary balance.
- **Typography:** Adopted **Plus Jakarta Sans** for its geometric, tech-humanist clarity. Bold, tightly-tracked headlines establish authority, while generous line heights in body text maintain legibility.
- **Depth & Elevation:** Eliminated heavy shadows and blurs. Relied entirely on tonal layers and crisp 1px borders (at low opacity) to define cards and inputs, echoing architectural blueprints.
- **Theme Adaptability:** Engineered a persistent, fully integrated Dark/Light mode toggle that flips the entire CSS variable ecosystem flawlessly, respecting user preference and accessibility.

## 5. Feature Prioritization
1. **The XP & Leaderboard Engine (Highest Priority):** Solves the retention crisis. Every valuable action (reading a book, booking a mentorship, registering for Makerspace) rewards XP. A compact leaderboard is injected directly into the persistent sidebar to drive competitive engagement.
2. **Action Pipelines (Launch & Fund):** Restructured abstract information into actionable funnels. Users can explicitly see requirements for institutional connects (i-TTO, HPC) and direct avenues for VC pipelines.
3. **Dynamic Content Hub (News/Events):** Implemented a centralized dashboard for upcoming events and campus startup news, complete with interactive bookmarking to give users a reason to check back weekly.
4. **Persistent Navigation:** Built a stateful, universally injected left-hand sidebar so the user always has situational awareness and one-click access to core verticals.

## 6. Overall Approach
I approached this challenge by shifting the paradigm from a **"Resource Folder"** to an **"Action-Oriented Launchpad"**. 

Technically, I opted for a lightning-fast, static architecture supercharged by modular Vanilla JS (`xp.js`) and a highly scalable, CSS-variable-driven design system (`style.css`). This ensures maximum performance without framework overhead.

By prioritizing user psychology (gamification), aesthetic excellence (Vibrant Architectural System), and actionable workflows (Mentorship & Funding forms), the resulting product is not just a place to find links—it is a mission control center that IIT Delhi students will actually *want* to use.
