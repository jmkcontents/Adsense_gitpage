// Text Analyzer Script

// Initialize
window.addEventListener('DOMContentLoaded', function() {
  // Add event listener for real-time analysis
  document.getElementById('textInput').addEventListener('input', analyzeText);

  // Initial analysis (empty state)
  analyzeText();

  // Check cookie consent
  if (!localStorage.getItem('cookieConsent')) {
    document.getElementById('cookieBanner').classList.add('show');
  }
});

// Analyze text function
function analyzeText() {
  const text = document.getElementById('textInput').value;

  // Character count with spaces
  const charWithSpace = text.length;
  document.getElementById('charWithSpace').textContent = charWithSpace.toLocaleString();

  // Character count without spaces
  const charWithoutSpace = text.replace(/\s/g, '').length;
  document.getElementById('charWithoutSpace').textContent = charWithoutSpace.toLocaleString();

  // Bytes (UTF-8)
  const bytesUTF8 = new Blob([text]).size;
  document.getElementById('bytesUTF8').textContent = bytesUTF8.toLocaleString();

  // Bytes (EUC-KR) - approximate calculation
  const bytesEUCKR = calculateEUCKRBytes(text);
  document.getElementById('bytesEUCKR').textContent = bytesEUCKR.toLocaleString();

  // Word count
  const wordCount = countWords(text);
  document.getElementById('wordCount').textContent = wordCount.toLocaleString();

  // Sentence count
  const sentenceCount = countSentences(text);
  document.getElementById('sentenceCount').textContent = sentenceCount.toLocaleString();

  // Line count
  const lineCount = text ? text.split('\n').length : 0;
  document.getElementById('lineCount').textContent = lineCount.toLocaleString();

  // Paragraph count
  const paragraphCount = countParagraphs(text);
  document.getElementById('paragraphCount').textContent = paragraphCount.toLocaleString();
}

// Calculate EUC-KR bytes (approximate)
function calculateEUCKRBytes(text) {
  let bytes = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);

    // ASCII characters (0-127) = 1 byte
    if (char <= 0x7F) {
      bytes += 1;
    }
    // Korean characters and other multibyte characters = 2 bytes in EUC-KR
    else {
      bytes += 2;
    }
  }

  return bytes;
}

// Count words
function countWords(text) {
  if (!text.trim()) {
    return 0;
  }

  // Split by whitespace and filter empty strings
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  return words.length;
}

// Count sentences
function countSentences(text) {
  if (!text.trim()) {
    return 0;
  }

  // Count sentences by terminal punctuation (., !, ?, 。, !, ?)
  const sentences = text.split(/[.!?。!?]+/).filter(sentence => sentence.trim().length > 0);
  return sentences.length;
}

// Count paragraphs
function countParagraphs(text) {
  if (!text.trim()) {
    return 0;
  }

  // Split by double line breaks or more
  const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0);
  return paragraphs.length;
}

// Remove all spaces
function removeAllSpaces() {
  const textInput = document.getElementById('textInput');
  const text = textInput.value;

  if (!text) {
    alert('텍스트를 먼저 입력해주세요.');
    return;
  }

  const result = text.replace(/\s/g, '');
  textInput.value = result;
  analyzeText();

  alert('모든 공백이 제거되었습니다.');
}

// Trim spaces (remove leading and trailing spaces)
function trimSpaces() {
  const textInput = document.getElementById('textInput');
  const text = textInput.value;

  if (!text) {
    alert('텍스트를 먼저 입력해주세요.');
    return;
  }

  // Trim each line and the whole text
  const lines = text.split('\n');
  const trimmedLines = lines.map(line => line.trim());
  const result = trimmedLines.join('\n').trim();

  textInput.value = result;
  analyzeText();

  alert('앞뒤 공백이 제거되었습니다.');
}

// Copy text to clipboard
function copyText() {
  const textInput = document.getElementById('textInput');
  const text = textInput.value;

  if (!text) {
    alert('복사할 텍스트가 없습니다.');
    return;
  }

  textInput.select();
  textInput.setSelectionRange(0, 99999);

  try {
    document.execCommand('copy');
    alert('텍스트가 클립보드에 복사되었습니다.');
  } catch (err) {
    navigator.clipboard.writeText(text).then(function() {
      alert('텍스트가 클립보드에 복사되었습니다.');
    }, function() {
      alert('복사에 실패했습니다.');
    });
  }
}

// Copy analysis results to clipboard
function copyAnalysis() {
  const text = document.getElementById('textInput').value;

  if (!text) {
    alert('먼저 텍스트를 입력해주세요.');
    return;
  }

  // Build analysis result text
  const charWithSpace = document.getElementById('charWithSpace').textContent;
  const charWithoutSpace = document.getElementById('charWithoutSpace').textContent;
  const bytesUTF8 = document.getElementById('bytesUTF8').textContent;
  const bytesEUCKR = document.getElementById('bytesEUCKR').textContent;
  const wordCount = document.getElementById('wordCount').textContent;
  const sentenceCount = document.getElementById('sentenceCount').textContent;
  const lineCount = document.getElementById('lineCount').textContent;
  const paragraphCount = document.getElementById('paragraphCount').textContent;

  const analysisText = `텍스트 분석 결과
=================
공백 포함 글자 수: ${charWithSpace}
공백 제외 글자 수: ${charWithoutSpace}
바이트 (UTF-8): ${bytesUTF8}
바이트 (EUC-KR): ${bytesEUCKR}
단어 수: ${wordCount}
문장 수: ${sentenceCount}
줄 수: ${lineCount}
문단 수: ${paragraphCount}`;

  // Copy to clipboard
  try {
    navigator.clipboard.writeText(analysisText).then(function() {
      alert('분석 결과가 클립보드에 복사되었습니다.');
    }, function() {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = analysisText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('분석 결과가 클립보드에 복사되었습니다.');
    });
  } catch (err) {
    alert('복사에 실패했습니다.');
  }
}

// Cookie Consent
function acceptCookies() {
  localStorage.setItem('cookieConsent', 'true');
  document.getElementById('cookieBanner').classList.remove('show');
}
