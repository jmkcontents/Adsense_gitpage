// D-Day Calculator Script

// Initialize
window.addEventListener('DOMContentLoaded', function() {
  // Set default date to 100 days from now
  setPreset(100);

  // Check cookie consent
  if (!localStorage.getItem('cookieConsent')) {
    document.getElementById('cookieBanner').classList.add('show');
  }
});

// Set preset days
function setPreset(days) {
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(targetDate.getDate() + days);

  // Format date for input (YYYY-MM-DD)
  const formattedDate = targetDate.toISOString().split('T')[0];
  document.getElementById('targetDate').value = formattedDate;

  // Auto calculate
  calculateDday();
}

// Set graduation date (next February 15)
function setGraduationDate() {
  const today = new Date();
  const currentYear = today.getFullYear();
  let graduationYear = currentYear;

  // If we're past February 15, set it to next year
  const thisYearGrad = new Date(currentYear, 1, 15); // February is month 1 (0-indexed)
  if (today > thisYearGrad) {
    graduationYear = currentYear + 1;
  }

  const graduationDate = new Date(graduationYear, 1, 15);
  const formattedDate = graduationDate.toISOString().split('T')[0];
  document.getElementById('targetDate').value = formattedDate;

  // Auto calculate
  calculateDday();
}

// Set New Year's Day (next January 1)
function setNewYear() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const nextYear = currentYear + 1;

  const newYearDate = new Date(nextYear, 0, 1); // January 1
  const formattedDate = newYearDate.toISOString().split('T')[0];
  document.getElementById('targetDate').value = formattedDate;

  // Auto calculate
  calculateDday();
}

// Calculate D-Day
function calculateDday() {
  const targetDateInput = document.getElementById('targetDate').value;

  if (!targetDateInput) {
    alert('날짜를 선택해주세요.');
    return;
  }

  // Parse dates
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to midnight

  const targetDate = new Date(targetDateInput);
  targetDate.setHours(0, 0, 0, 0); // Reset time to midnight

  // Calculate difference in milliseconds
  const diffTime = targetDate - today;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Display D-Day
  let ddayText;
  if (diffDays > 0) {
    ddayText = `D-${diffDays}`;
  } else if (diffDays === 0) {
    ddayText = 'D-Day';
  } else {
    ddayText = `D+${Math.abs(diffDays)}`;
  }

  document.getElementById('ddayDisplay').textContent = ddayText;

  // Format dates for display
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];
    return `${year}년 ${month}월 ${day}일 (${weekday})`;
  };

  document.getElementById('selectedDate').textContent = formatDate(targetDate);
  document.getElementById('todayDate').textContent = formatDate(today);

  // Calculate breakdown (years, months, days)
  const breakdown = calculateBreakdown(today, targetDate);
  let breakdownText = '';
  if (breakdown.years > 0) {
    breakdownText += `${breakdown.years}년 `;
  }
  if (breakdown.months > 0) {
    breakdownText += `${breakdown.months}개월 `;
  }
  breakdownText += `${breakdown.days}일`;

  document.getElementById('breakdown').textContent = breakdownText;

  // Total days
  document.getElementById('totalDays').textContent = `${Math.abs(diffDays).toLocaleString()}일`;

  // Total weeks
  const totalWeeks = Math.floor(Math.abs(diffDays) / 7);
  const remainingDays = Math.abs(diffDays) % 7;
  document.getElementById('totalWeeks').textContent = `${totalWeeks.toLocaleString()}주 ${remainingDays}일`;

  // Total hours
  const totalHours = Math.abs(diffDays) * 24;
  document.getElementById('totalHours').textContent = `${totalHours.toLocaleString()}시간`;

  // Show results
  document.getElementById('results').style.display = 'block';
}

// Calculate breakdown (years, months, days)
function calculateBreakdown(startDate, endDate) {
  // Ensure startDate is before endDate
  let isNegative = false;
  if (startDate > endDate) {
    [startDate, endDate] = [endDate, startDate];
    isNegative = true;
  }

  let years = 0;
  let months = 0;
  let days = 0;

  // Calculate years
  years = endDate.getFullYear() - startDate.getFullYear();

  // Calculate months
  months = endDate.getMonth() - startDate.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }

  // Calculate days
  days = endDate.getDate() - startDate.getDate();
  if (days < 0) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }

    // Get days in previous month
    const prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
    days += prevMonth.getDate();
  }

  return { years, months, days };
}

// Cookie Consent
function acceptCookies() {
  localStorage.setItem('cookieConsent', 'true');
  document.getElementById('cookieBanner').classList.remove('show');
}
