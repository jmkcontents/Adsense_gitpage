// Password Generator Script

// Character sets
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SPECIAL = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Ambiguous characters to exclude
const AMBIGUOUS = '0O1lI';

// Update length display
document.getElementById('passwordLength').addEventListener('input', function() {
  document.getElementById('lengthValue').textContent = this.value;
});

// Generate password function
function generatePassword() {
  const length = parseInt(document.getElementById('passwordLength').value);
  const includeUppercase = document.getElementById('includeUppercase').checked;
  const includeLowercase = document.getElementById('includeLowercase').checked;
  const includeNumbers = document.getElementById('includeNumbers').checked;
  const includeSpecial = document.getElementById('includeSpecial').checked;
  const excludeAmbiguous = document.getElementById('excludeAmbiguous').checked;

  // Build character set
  let charset = '';
  let requiredChars = [];

  if (includeUppercase) {
    const chars = excludeAmbiguous ? UPPERCASE.split('').filter(c => !AMBIGUOUS.includes(c)).join('') : UPPERCASE;
    charset += chars;
    requiredChars.push(chars[Math.floor(Math.random() * chars.length)]);
  }

  if (includeLowercase) {
    const chars = excludeAmbiguous ? LOWERCASE.split('').filter(c => !AMBIGUOUS.includes(c)).join('') : LOWERCASE;
    charset += chars;
    requiredChars.push(chars[Math.floor(Math.random() * chars.length)]);
  }

  if (includeNumbers) {
    const chars = excludeAmbiguous ? NUMBERS.split('').filter(c => !AMBIGUOUS.includes(c)).join('') : NUMBERS;
    charset += chars;
    requiredChars.push(chars[Math.floor(Math.random() * chars.length)]);
  }

  if (includeSpecial) {
    charset += SPECIAL;
    requiredChars.push(SPECIAL[Math.floor(Math.random() * SPECIAL.length)]);
  }

  // Validate at least one option is selected
  if (charset.length === 0) {
    alert('최소 한 가지 문자 종류를 선택해야 합니다.');
    return;
  }

  // Generate password
  let password = '';

  // Add required characters first to ensure variety
  for (let char of requiredChars) {
    password += char;
  }

  // Fill remaining length with random characters
  for (let i = password.length; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  // Shuffle the password to randomize required character positions
  password = password.split('').sort(() => Math.random() - 0.5).join('');

  // Display password
  document.getElementById('generatedPassword').value = password;

  // Calculate and display strength
  updatePasswordStrength(password, charset);

  // Hide batch passwords
  document.getElementById('batchPasswords').classList.add('hidden');
}

// Calculate password strength
function updatePasswordStrength(password, charset) {
  const length = password.length;
  const varietyCount = [
    document.getElementById('includeUppercase').checked,
    document.getElementById('includeLowercase').checked,
    document.getElementById('includeNumbers').checked,
    document.getElementById('includeSpecial').checked
  ].filter(Boolean).length;

  let strength = 'weak';
  let strengthText = '약함';

  // Calculate entropy-based strength
  if (length >= 16 && varietyCount >= 3) {
    strength = 'very-strong';
    strengthText = '매우 강함';
  } else if (length >= 12 && varietyCount >= 3) {
    strength = 'strong';
    strengthText = '강함';
  } else if (length >= 8 && varietyCount >= 2) {
    strength = 'medium';
    strengthText = '보통';
  }

  // Update UI
  const strengthBar = document.getElementById('strengthBar');
  strengthBar.className = 'strength-fill ' + strength;
  document.getElementById('strengthText').textContent = strengthText;
}

// Copy password to clipboard
function copyPassword() {
  const passwordField = document.getElementById('generatedPassword');
  const password = passwordField.value;

  if (!password) {
    alert('먼저 비밀번호를 생성해주세요.');
    return;
  }

  // Copy to clipboard
  passwordField.select();
  passwordField.setSelectionRange(0, 99999); // For mobile devices

  try {
    document.execCommand('copy');
    alert('비밀번호가 클립보드에 복사되었습니다.');
  } catch (err) {
    // Fallback for modern browsers
    navigator.clipboard.writeText(password).then(function() {
      alert('비밀번호가 클립보드에 복사되었습니다.');
    }, function() {
      alert('복사에 실패했습니다. 수동으로 복사해주세요.');
    });
  }
}

// Generate batch of passwords
function generateBatch() {
  const batchList = document.getElementById('batchList');
  const length = parseInt(document.getElementById('passwordLength').value);
  const includeUppercase = document.getElementById('includeUppercase').checked;
  const includeLowercase = document.getElementById('includeLowercase').checked;
  const includeNumbers = document.getElementById('includeNumbers').checked;
  const includeSpecial = document.getElementById('includeSpecial').checked;

  // Build character set (same as generatePassword)
  let charset = '';
  if (includeUppercase) charset += UPPERCASE;
  if (includeLowercase) charset += LOWERCASE;
  if (includeNumbers) charset += NUMBERS;
  if (includeSpecial) charset += SPECIAL;

  if (charset.length === 0) {
    alert('최소 한 가지 문자 종류를 선택해야 합니다.');
    return;
  }

  // Generate 5 passwords
  let html = '';
  for (let i = 0; i < 5; i++) {
    let password = '';
    for (let j = 0; j < length; j++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }
    html += `
      <div class="result-item">
        <span class="result-label">${i + 1}.</span>
        <span class="result-value" style="font-family: monospace; font-size: 0.95rem;">${password}</span>
      </div>
    `;
  }

  batchList.innerHTML = html;
  document.getElementById('batchPasswords').classList.remove('hidden');
}

// Cookie Consent
function acceptCookies() {
  localStorage.setItem('cookieConsent', 'true');
  document.getElementById('cookieBanner').classList.remove('show');
}

// Check if user has already consented
window.addEventListener('DOMContentLoaded', function() {
  if (!localStorage.getItem('cookieConsent')) {
    document.getElementById('cookieBanner').classList.add('show');
  }

  // Generate initial password on load
  generatePassword();
});
