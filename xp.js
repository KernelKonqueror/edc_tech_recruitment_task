// Theme Initialization
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark-mode");
}

window.toggleTheme = () => {
  const isDark = document.documentElement.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  
  const icon = document.getElementById("theme-icon");
  const text = document.getElementById("theme-text");
  if (icon && text) {
    icon.textContent = isDark ? "light_mode" : "dark_mode";
    text.textContent = isDark ? "Light Mode" : "Dark Mode";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Calculate XP
  const calculateXP = () => {
    let resourceXP = 0;

    // Completed Resources XP (Books & Podcasts)
    const savedCompleted = localStorage.getItem("completed_resources");
    const completed = savedCompleted ? JSON.parse(savedCompleted) : { "lean-startup": true };

    const booksData = window.booksData || [];
    booksData.forEach((book) => {
      if (completed[book.id]) {
        resourceXP += book.xp;
      }
    });

    const podcastsData = window.podcastsData || [];
    podcastsData.forEach((podcast) => {
      if (completed[podcast.id]) {
        resourceXP += podcast.xp;
      }
    });

    // Campus Resources Applied XP
    const savedCampus = localStorage.getItem("campus_resources_applied");
    const campusApplied = savedCampus ? JSON.parse(savedCampus) : {};
    if (campusApplied.makerspace) resourceXP += 10;
    if (campusApplied.itto) resourceXP += 10;
    if (campusApplied.rd_partnership) resourceXP += 15;
    if (campusApplied.hpc) resourceXP += 20;
    if (campusApplied.tech_support) resourceXP += 10;

    // Mentorship Session Booked XP
    if (localStorage.getItem("mentorship_session_booked") === "true") {
      resourceXP += 15;
    }

    // Consult eDC for Funds XP
    if (localStorage.getItem("consult_edc_funds") === "true") {
      resourceXP += 20;
    }

    // Registered Events XP
    const savedEvents = localStorage.getItem("registered_events");
    const registeredEvents = savedEvents ? JSON.parse(savedEvents) : {};
    let eventXP = 0;
    Object.keys(registeredEvents).forEach(key => {
      if (registeredEvents[key]) eventXP += 10;
    });
    resourceXP += eventXP;

    // Shared Milestones XP
    if (localStorage.getItem("shared_milestone_submitted") === "true") {
      resourceXP += 15;
    }

    const dailyXP = resourceXP;
    const totalXP = 8000 + dailyXP;

    return { dailyXP, totalXP };
  };

  // 2. Render and Inject Sidebar with Integrated Leaderboard
  const renderSidebar = () => {
    const sidebarContainer = document.getElementById("sidebar-container");
    if (!sidebarContainer) return;

    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    
    let activeTab = 'dashboard';
    if (filename.startsWith('explore.html') || filename.startsWith('book.html') || filename.startsWith('podcast.html')) {
      activeTab = 'explore';
    } else if (filename.startsWith('launch.html')) {
      activeTab = 'launch';
    } else if (filename.startsWith('fund.html')) {
      activeTab = 'fund';
    } else if (filename.startsWith('news.html')) {
      activeTab = 'news';
    }

    const { dailyXP, totalXP } = calculateXP();
    const percent = Math.min(100, (dailyXP / 500) * 100);
    const isDark = document.documentElement.classList.contains("dark-mode");

    sidebarContainer.innerHTML = `
      <nav class="sidebar glass-panel" style="display: flex; flex-direction: column; height: 100%;">
        <div class="logo-container">
          <div class="logo-icon">e</div>
          <span class="logo-text">eDC Launchpad</span>
        </div>
        
        <ul class="nav-links" style="margin-bottom: auto; display: flex; flex-direction: column; gap: 0.5rem; list-style: none;">
          <li class="nav-item ${activeTab === 'dashboard' ? 'active' : ''}">
            <a href="index.html" style="display: flex; align-items: center; gap: 0.75rem; text-decoration: none; color: inherit;">
              <span class="material-symbols-outlined">dashboard</span>
              Dashboard
            </a>
          </li>
          <li class="nav-item ${activeTab === 'explore' ? 'active' : ''}">
            <a href="explore.html" style="display: flex; align-items: center; gap: 0.75rem; text-decoration: none; color: inherit;">
              <span class="material-symbols-outlined">explore</span>
              Explore
            </a>
          </li>
          <li class="nav-item ${activeTab === 'launch' ? 'active' : ''}">
            <a href="launch.html" style="display: flex; align-items: center; gap: 0.75rem; text-decoration: none; color: inherit;">
              <span class="material-symbols-outlined">rocket_launch</span>
              Launch
            </a>
          </li>
          <li class="nav-item ${activeTab === 'fund' ? 'active' : ''}">
            <a href="fund.html" style="display: flex; align-items: center; gap: 0.75rem; text-decoration: none; color: inherit;">
              <span class="material-symbols-outlined">payments</span>
              Fund
            </a>
          </li>
          <li class="nav-item ${activeTab === 'news' ? 'active' : ''}">
            <a href="news.html" style="display: flex; align-items: center; gap: 0.75rem; text-decoration: none; color: inherit;">
              <span class="material-symbols-outlined">newspaper</span>
              News
            </a>
          </li>
        </ul>

        <!-- Get Mentorship CTA Button -->
        <div style="padding: 0 0.5rem; margin-top: 0.75rem; margin-bottom: 0.5rem;">
          <button onclick="openMentorshipModal()" class="btn btn-primary btn-icon-sm" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.8125rem; padding: 0.625rem; border-radius: 8px; font-weight: 600; cursor: pointer; border: none;">
            <span class="material-symbols-outlined" style="font-size: 1.125rem;">school</span>
            Get Mentorship
          </button>
        </div>

        <!-- Compact Integrated Leaderboard Section -->
        <div class="sidebar-leaderboard" style="padding: 1.25rem 0.5rem; border-top: 1px solid rgba(255, 255, 255, 0.06); display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem; margin-top: 0.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-family: var(--font-family-display); font-size: 0.75rem; text-transform: uppercase; color: var(--color-on-surface-variant); letter-spacing: 0.05em; font-weight: 600;">🏆 Leaderboard</span>
            <span class="text-secondary font-bold" id="sidebar-daily-xp" style="font-size: 0.75rem;">${dailyXP} / 500 XP</span>
          </div>
          
          <div class="progress-track" style="height: 4px; background: var(--color-surface-container-high); border-radius: 99px; overflow: hidden;">
            <div class="progress-fill secondary" id="sidebar-progress-bar" style="width: ${percent}%; height: 100%; background: var(--color-secondary); transition: width 0.3s ease;"></div>
          </div>

          <div class="sidebar-rank-list" style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.25rem;">
            <!-- Rank 1 -->
            <div class="sidebar-rank-item" style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem;">
              <span class="rank-num" style="font-weight: bold; width: 0.75rem; color: var(--color-tertiary);">1</span>
              <div style="display: flex; align-items: center; justify-content: center; background: var(--color-surface-container-high); border-radius: 50%; width: 1.5rem; height: 1.5rem;">
                <span class="material-symbols-outlined" style="font-size: 1.125rem; color: var(--color-outline);">person</span>
              </div>
              <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--color-on-surface-variant);">Ravi</span>
              <span class="text-on-surface-variant" style="opacity: 0.8;">12.4k</span>
            </div>
            <!-- Rank 2 -->
            <div class="sidebar-rank-item" style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem;">
              <span class="rank-num" style="font-weight: bold; width: 0.75rem; color: var(--color-outline);">2</span>
              <div style="display: flex; align-items: center; justify-content: center; background: var(--color-surface-container-high); border-radius: 50%; width: 1.5rem; height: 1.5rem;">
                <span class="material-symbols-outlined" style="font-size: 1.125rem; color: var(--color-outline);">person</span>
              </div>
              <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--color-on-surface-variant);">Amit</span>
              <span class="text-on-surface-variant" style="opacity: 0.8;">10.8k</span>
            </div>
            <!-- Rank 3 (You) -->
            <div class="sidebar-rank-item user-highlight" style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; background: var(--color-secondary-container); padding: 0.375rem 0.5rem; border-radius: 6px; border: 1px solid var(--color-secondary);">
              <span class="rank-num" style="font-weight: bold; width: 0.75rem; color: var(--color-on-secondary-container);">3</span>
              <div style="display: flex; align-items: center; justify-content: center; background: var(--color-secondary); border-radius: 50%; width: 1.5rem; height: 1.5rem;">
                <span class="material-symbols-outlined" style="font-size: 1.125rem; color: var(--color-on-secondary);">person</span>
              </div>
              <span style="flex: 1; color: var(--color-on-secondary-container); font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">You</span>
              <span class="font-bold" id="sidebar-total-xp" style="color: var(--color-on-secondary-container);">${totalXP.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div class="sidebar-footer" style="padding-top: 0; border-top: none; display: flex; flex-direction: column; gap: 0.5rem;">
          <button id="theme-toggle" class="btn btn-icon-sm" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.8125rem; padding: 0.625rem; border-radius: 8px; background: var(--color-outline-variant); color: var(--color-on-surface); border: 1px solid var(--color-outline-variant); cursor: pointer; transition: all 0.3s ease;" onclick="window.toggleTheme()">
            <span class="material-symbols-outlined theme-icon" id="theme-icon" style="font-size: 1.125rem;">${isDark ? 'light_mode' : 'dark_mode'}</span>
            <span class="theme-text" id="theme-text">${isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <a href="#" class="logout-link" style="display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: inherit; margin-top: 0.5rem;">
            <span class="material-symbols-outlined">lock</span>
            Admin Access
          </a>
        </div>
      </nav>
    `;
  };

  // Initial Sidebar rendering
  renderSidebar();

  // 3. Clear Right Leaderboard Container (since it is hidden & integrated)
  const leaderboardContainer = document.getElementById("leaderboard-container");
  if (leaderboardContainer) {
    leaderboardContainer.innerHTML = "";
  }

  // 4. Expose Global Update Leaderboard Function
  window.updateXPUI = () => {
    const { dailyXP, totalXP } = calculateXP();
    const percent = Math.min(100, (dailyXP / 500) * 100);

    const dailyEl = document.getElementById("sidebar-daily-xp");
    const fillEl = document.getElementById("sidebar-progress-bar");
    const totalEl = document.getElementById("sidebar-total-xp");

    if (dailyEl) dailyEl.innerText = `${dailyXP} / 500 XP`;
    if (fillEl) fillEl.style.width = `${percent}%`;
    if (totalEl) totalEl.innerText = `${totalXP.toLocaleString()}`;
  };

  // 5. Mentorship Modal Injection & Event Handlers
  const ensureMentorshipModal = () => {
    if (document.getElementById("mentorship-modal")) return;

    const modalHtml = `
      <div id="mentorship-modal" class="modal-backdrop">
        <div class="modal-container" style="max-width: 480px; display: flex; flex-direction: column;">
          <div class="modal-header" style="padding: 1.25rem 2rem; border-bottom: 1px solid rgba(255, 255, 255, 0.06); display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-family: var(--font-family-display); font-size: 1.125rem; font-weight: 600; color: var(--color-on-surface); display: flex; align-items: center; gap: 0.5rem; margin: 0;">
              <span class="material-symbols-outlined" style="color: var(--color-primary);">school</span> Get Mentorship
            </h3>
            <button class="modal-close-btn" onclick="closeMentorshipModal()" style="background: transparent; border: none; color: var(--color-on-surface-variant); cursor: pointer; display: flex; align-items: center; justify-content: center; width: 2.25rem; height: 2.25rem; border-radius: 50%;">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="modal-body" style="display: block; padding: 1.5rem; overflow-y: auto;">
            <form id="mentorship-form" onsubmit="handleMentorshipSubmit(event)">
              <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 0.375rem;">
                  <label class="font-label-md text-secondary" style="font-size: 0.75rem;">Startup / Project Name</label>
                  <input type="text" class="form-input" required id="mentor-startup-name" placeholder="e.g. MyTech AI" style="width: 100%; box-sizing: border-box;">
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.375rem;">
                  <label class="font-label-md text-secondary" style="font-size: 0.75rem;">Domain expertise needed</label>
                  <select class="form-input" style="background: rgba(29, 32, 39, 0.95); width: 100%; box-sizing: border-box;" id="mentor-domain">
                    <option value="business">Business Strategy & Revenue Model</option>
                    <option value="tech">Technical Architecture & Stack Choice</option>
                    <option value="pitching">Pitch Deck Refinement</option>
                    <option value="legal">IP Strategy & Legal Filing</option>
                  </select>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.375rem;">
                  <label class="font-label-md text-secondary" style="font-size: 0.75rem;">Select Faculty / Industry Mentor</label>
                  <select class="form-input" style="background: rgba(29, 32, 39, 0.95); width: 100%; box-sizing: border-box;" id="mentor-profile">
                    <option value="Amitabha Bagchi">Prof. Amitabha Bagchi (AI/ML & Databases)</option>
                    <option value="Brejesh Lall">Prof. Brejesh Lall (Hardware & IoT)</option>
                    <option value="Anurag Rathore">Prof. Anurag Rathore (Biotech & MedTech)</option>
                    <option value="Jyoti Kumar">Prof. Jyoti Kumar (UI/UX Design & HCI)</option>
                    <option value="V. Ramgopal Rao">Prof. V. Ramgopal Rao (Deep Tech & Sensors)</option>
                    <option value="P. Vigneswara Ilavarasan">Prof. P. Vigneswara Ilavarasan (Biz Strategy & FinTech)</option>
                    <option value="edc-alumni">eDC Alumni Advisor</option>
                  </select>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.375rem;">
                  <label class="font-label-md text-secondary" style="font-size: 0.75rem;">What is your primary mentorship goal?</label>
                  <textarea class="form-textarea" required id="mentor-desc" placeholder="Describe the specific challenges you wish to discuss with the mentor." style="width: 100%; box-sizing: border-box; min-height: 4rem;"></textarea>
                </div>
              </div>
              <div style="display: flex; justify-content: flex-end; gap: 1rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1rem;">
                <button type="button" class="btn btn-secondary" onclick="closeMentorshipModal()" style="font-size: 0.8125rem; padding: 0.5rem 1rem;">Cancel</button>
                <button type="submit" class="btn btn-primary" style="font-size: 0.8125rem; padding: 0.5rem 1rem;">Schedule Session</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    const div = document.createElement("div");
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);
  };

  window.openMentorshipModal = () => {
    ensureMentorshipModal();
    const modal = document.getElementById("mentorship-modal");
    if (modal) modal.classList.add("active");
  };

  window.closeMentorshipModal = () => {
    const modal = document.getElementById("mentorship-modal");
    if (modal) modal.classList.remove("active");
  };

  window.handleMentorshipSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("mentorship_session_booked", "true");

    // Dispatch event to refresh sidebar score and total XP
    window.dispatchEvent(new Event("xp-updated"));
    if (window.updateXPUI) window.updateXPUI();

    window.closeMentorshipModal();
    alert("Mentorship booking request submitted successfully! The eDC Team will verify and match you with a mentor. (+15 XP awarded)");
  };

  // 6. Consult eDC Funds Modal Injection & Event Handlers
  const ensureConsultFundsModal = () => {
    if (document.getElementById("consult-funds-modal")) return;

    const modalHtml = `
      <div id="consult-funds-modal" class="modal-backdrop">
        <div class="modal-container" style="max-width: 480px; display: flex; flex-direction: column;">
          <div class="modal-header" style="padding: 1.25rem 2rem; border-bottom: 1px solid rgba(255, 255, 255, 0.06); display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-family: var(--font-family-display); font-size: 1.125rem; font-weight: 600; color: var(--color-on-surface); display: flex; align-items: center; gap: 0.5rem; margin: 0;">
              <span class="material-symbols-outlined" style="color: var(--color-primary); font-size: 1.5rem;">diversity_3</span> Consult eDC for Funds
            </h3>
            <button class="modal-close-btn" onclick="closeConsultFundsModal()" style="background: transparent; border: none; color: var(--color-on-surface-variant); cursor: pointer; display: flex; align-items: center; justify-content: center; width: 2.25rem; height: 2.25rem; border-radius: 50%;">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="modal-body" style="display: block; padding: 1.5rem; overflow-y: auto;">
            <form id="consult-funds-form" onsubmit="handleConsultFundsSubmit(event)">
              <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 0.375rem;">
                  <label class="font-label-md text-secondary" style="font-size: 0.75rem;">Startup / Project Name</label>
                  <input type="text" class="form-input" required id="consult-startup-name" placeholder="e.g. MyTech AI" style="width: 100%; box-sizing: border-box;">
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.375rem;">
                  <label class="font-label-md text-secondary" style="font-size: 0.75rem;">Current Development Stage</label>
                  <select class="form-input" style="background: rgba(29, 32, 39, 0.95); width: 100%; box-sizing: border-box;" id="consult-stage">
                    <option value="ideation">Ideation (Idea stage / Researching)</option>
                    <option value="prototype">Prototype (MVP built / Early testing)</option>
                    <option value="early-traction">Early Traction (Paying customers / Active users)</option>
                  </select>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.375rem;">
                  <label class="font-label-md text-secondary" style="font-size: 0.75rem;">What funding format are you seeking?</label>
                  <select class="form-input" style="background: rgba(29, 32, 39, 0.95); width: 100%; box-sizing: border-box;" id="consult-funding-type">
                    <option value="grant">Government / Institutional Grant (Non-dilutive)</option>
                    <option value="seed">Equity Seed Round (Angel / Incubator / VC)</option>
                    <option value="fellowship">Incubator Fellowship / Stipend</option>
                  </select>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.375rem;">
                  <label class="font-label-md text-secondary" style="font-size: 0.75rem;">Pitch Deck Link (Google Drive / DocSend)</label>
                  <input type="url" class="form-input" required id="consult-deck-link" placeholder="e.g. https://docsend.com/view/..." style="width: 100%; box-sizing: border-box;">
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.375rem;">
                  <label class="font-label-md text-secondary" style="font-size: 0.75rem;">Briefly describe your solution and team</label>
                  <textarea class="form-textarea" required id="consult-desc" placeholder="Explain what problem you are solving and who is on your team." style="width: 100%; box-sizing: border-box; min-height: 4rem;"></textarea>
                </div>
              </div>
              <div style="display: flex; justify-content: flex-end; gap: 1rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1rem;">
                <button type="button" class="btn btn-secondary" onclick="closeConsultFundsModal()" style="font-size: 0.8125rem; padding: 0.5rem 1rem;">Cancel</button>
                <button type="submit" class="btn btn-primary" style="font-size: 0.8125rem; padding: 0.5rem 1rem;">Submit Consultation Request</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    const div = document.createElement("div");
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);
  };

  window.openConsultFundsModal = () => {
    ensureConsultFundsModal();
    const modal = document.getElementById("consult-funds-modal");
    if (modal) modal.classList.add("active");
  };

  window.closeConsultFundsModal = () => {
    const modal = document.getElementById("consult-funds-modal");
    if (modal) modal.classList.remove("active");
  };

  window.handleConsultFundsSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("consult_edc_funds", "true");

    // Dispatch event to refresh sidebar score and total XP
    window.dispatchEvent(new Event("xp-updated"));
    if (window.updateXPUI) window.updateXPUI();

    window.closeConsultFundsModal();
    alert("Funding consultation request submitted successfully! The eDC Investment Vertical team will review your deck and get back to you within 3 business days. (+20 XP awarded)");
  };

  // 7. Register for Event Modal Injection & Event Handlers
  const ensureRegisterEventModal = () => {
    if (document.getElementById("register-event-modal")) return;

    const modalHtml = `
      <div id="register-event-modal" class="modal-backdrop">
        <div class="modal-container" style="max-width: 480px; display: flex; flex-direction: column;">
          <div class="modal-header" style="padding: 1.25rem 2rem; border-bottom: 1px solid rgba(255, 255, 255, 0.06); display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-family: var(--font-family-display); font-size: 1.125rem; font-weight: 600; color: var(--color-on-surface); display: flex; align-items: center; gap: 0.5rem; margin: 0;" id="event-modal-title-el">
              <span class="material-symbols-outlined" style="color: var(--color-primary); font-size: 1.5rem;">event</span> Register for Event
            </h3>
            <button class="modal-close-btn" onclick="closeRegisterEventModal()" style="background: transparent; border: none; color: var(--color-on-surface-variant); cursor: pointer; display: flex; align-items: center; justify-content: center; width: 2.25rem; height: 2.25rem; border-radius: 50%;">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="modal-body" style="display: block; padding: 1.5rem; overflow-y: auto;">
            <form id="register-event-form" onsubmit="handleRegisterEventSubmit(event)">
              <input type="hidden" id="register-event-id">
              <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
                <p id="event-modal-desc-el" class="font-body-md" style="color: var(--text-secondary); margin: 0; line-height: 1.5;"></p>
                <div style="display: flex; flex-direction: column; gap: 0.375rem;">
                  <label class="font-label-md text-secondary" style="font-size: 0.75rem;">Your Full Name</label>
                  <input type="text" class="form-input" required id="register-user-name" placeholder="e.g. Rahul Sharma" style="width: 100%; box-sizing: border-box;">
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.375rem;">
                  <label class="font-label-md text-secondary" style="font-size: 0.75rem;">IIT Delhi Entry Number</label>
                  <input type="text" class="form-input" required id="register-entry-num" placeholder="e.g. 2024CS10234" style="width: 100%; box-sizing: border-box;">
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.375rem;">
                  <label class="font-label-md text-secondary" style="font-size: 0.75rem;">Startup Name (if applicable)</label>
                  <input type="text" class="form-input" id="register-startup-name" placeholder="e.g. MyTech AI (Optional)" style="width: 100%; box-sizing: border-box;">
                </div>
              </div>
              <div style="display: flex; justify-content: flex-end; gap: 1rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1rem;">
                <button type="button" class="btn btn-secondary" onclick="closeRegisterEventModal()" style="font-size: 0.8125rem; padding: 0.5rem 1rem;">Cancel</button>
                <button type="submit" class="btn btn-primary" style="font-size: 0.8125rem; padding: 0.5rem 1rem;">Confirm Registration</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    const div = document.createElement("div");
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);
  };

  window.openRegisterEventModal = (eventId, eventTitle, eventDate, eventTime) => {
    ensureRegisterEventModal();
    const modal = document.getElementById("register-event-modal");
    if (modal) {
      document.getElementById("register-event-id").value = eventId;
      document.getElementById("event-modal-title-el").innerHTML = `
        <span class="material-symbols-outlined" style="color: var(--color-primary); font-size: 1.5rem;">event</span> Register: ${eventTitle}
      `;
      document.getElementById("event-modal-desc-el").innerText = `
        Confirm your registration for "${eventTitle}" scheduled for ${eventDate} at ${eventTime}.
      `;
      modal.classList.add("active");
    }
  };

  window.closeRegisterEventModal = () => {
    const modal = document.getElementById("register-event-modal");
    if (modal) modal.classList.remove("active");
  };

  window.handleRegisterEventSubmit = (event) => {
    event.preventDefault();
    const eventId = document.getElementById("register-event-id").value;
    
    const savedEvents = localStorage.getItem("registered_events");
    const registeredEvents = savedEvents ? JSON.parse(savedEvents) : {};
    registeredEvents[eventId] = true;
    localStorage.setItem("registered_events", JSON.stringify(registeredEvents));

    // Dispatch event to refresh sidebar score and total XP
    window.dispatchEvent(new Event("xp-updated"));
    if (window.updateXPUI) window.updateXPUI();

    window.closeRegisterEventModal();
    alert("Event registration confirmed! Your pass has been emailed to your IITD webmail. (+10 XP awarded)");

    // Dispatch custom event to notify page to re-render calendar
    window.dispatchEvent(new Event("calendar-updated"));
  };

  // 8. Share Milestone Modal Injection & Event Handlers
  const ensureShareMilestoneModal = () => {
    if (document.getElementById("share-milestone-modal")) return;

    const modalHtml = `
      <div id="share-milestone-modal" class="modal-backdrop">
        <div class="modal-container" style="max-width: 480px; display: flex; flex-direction: column;">
          <div class="modal-header" style="padding: 1.25rem 2rem; border-bottom: 1px solid rgba(255, 255, 255, 0.06); display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-family: var(--font-family-display); font-size: 1.125rem; font-weight: 600; color: var(--color-on-surface); display: flex; align-items: center; gap: 0.5rem; margin: 0;">
              <span class="material-symbols-outlined" style="color: var(--color-primary); font-size: 1.5rem;">add_circle</span> Share Startup Milestone
            </h3>
            <button class="modal-close-btn" onclick="closeShareMilestoneModal()" style="background: transparent; border: none; color: var(--color-on-surface-variant); cursor: pointer; display: flex; align-items: center; justify-content: center; width: 2.25rem; height: 2.25rem; border-radius: 50%;">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="modal-body" style="display: block; padding: 1.5rem; overflow-y: auto;">
            <form id="share-milestone-form" onsubmit="handleShareMilestoneSubmit(event)">
              <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 0.375rem;">
                  <label class="font-label-md text-secondary" style="font-size: 0.75rem;">Startup Name</label>
                  <input type="text" class="form-input" required id="milestone-startup-name" placeholder="e.g. OmniSense Robotics" style="width: 100%; box-sizing: border-box;">
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.375rem;">
                  <label class="font-label-md text-secondary" style="font-size: 0.75rem;">Milestone Type</label>
                  <select class="form-input" style="background: rgba(29, 32, 39, 0.95); width: 100%; box-sizing: border-box;" id="milestone-category">
                    <option value="funding">Funding Raised</option>
                    <option value="achievement">Award / Achievement</option>
                    <option value="event">Startup Event / Launch</option>
                  </select>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.375rem;">
                  <label class="font-label-md text-secondary" style="font-size: 0.75rem;">Title / Headline</label>
                  <input type="text" class="form-input" required id="milestone-title" placeholder="e.g. Raises Pre-Seed round or Launches Beta" style="width: 100%; box-sizing: border-box;">
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.375rem;">
                  <label class="font-label-md text-secondary" style="font-size: 0.75rem;">Details & Description</label>
                  <textarea class="form-textarea" required id="milestone-desc" placeholder="Describe the details, sponsors, or metrics of this milestone." style="width: 100%; box-sizing: border-box; min-height: 4rem;"></textarea>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.375rem;">
                  <label class="font-label-md text-secondary" style="font-size: 0.75rem;">Press Release / Coverage Link (Optional)</label>
                  <input type="url" class="form-input" id="milestone-link" placeholder="e.g. https://yourstartup.com/blog/..." style="width: 100%; box-sizing: border-box;">
                </div>
              </div>
              <div style="display: flex; justify-content: flex-end; gap: 1rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1rem;">
                <button type="button" class="btn btn-secondary" onclick="closeShareMilestoneModal()" style="font-size: 0.8125rem; padding: 0.5rem 1rem;">Cancel</button>
                <button type="submit" class="btn btn-primary" style="font-size: 0.8125rem; padding: 0.5rem 1rem;">Submit Milestone</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    const div = document.createElement("div");
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);
  };

  window.openShareMilestoneModal = () => {
    ensureShareMilestoneModal();
    const modal = document.getElementById("share-milestone-modal");
    if (modal) modal.classList.add("active");
  };

  window.closeShareMilestoneModal = () => {
    const modal = document.getElementById("share-milestone-modal");
    if (modal) modal.classList.remove("active");
  };

  window.handleShareMilestoneSubmit = (event) => {
    event.preventDefault();
    const startupName = document.getElementById("milestone-startup-name").value;
    const category = document.getElementById("milestone-category").value;
    const title = document.getElementById("milestone-title").value;
    const desc = document.getElementById("milestone-desc").value;
    const link = document.getElementById("milestone-link").value || "#";

    const customArticle = {
      category: category,
      title: `${startupName}: ${title}`,
      desc: desc,
      time: "Just now",
      readTime: "1 min read",
      highlights: [category.toUpperCase(), "Student Submission"],
      url: link
    };

    // Save custom milestone to localstorage list
    const savedCustoms = localStorage.getItem("custom_milestones");
    const customsList = savedCustoms ? JSON.parse(savedCustoms) : [];
    customsList.unshift(customArticle);
    localStorage.setItem("custom_milestones", JSON.stringify(customsList));

    localStorage.setItem("shared_milestone_submitted", "true");

    // Dispatch event to refresh sidebar score and total XP
    window.dispatchEvent(new Event("xp-updated"));
    if (window.updateXPUI) window.updateXPUI();

    window.closeShareMilestoneModal();
    alert("Milestone shared successfully! It is now live in your ecosystem feed and under review. (+15 XP awarded)");

    // Dispatch custom event to notify page to re-render news
    window.dispatchEvent(new Event("news-updated"));
  };
});
