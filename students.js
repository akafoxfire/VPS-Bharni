// Requires data.js to be loaded first (CLASSES, STUDENTS, studentsInClass)

const classPicker = document.getElementById('classPicker');
const tableBody = document.getElementById('studentTableBody');

function renderClassPicker(activeClass) {
  classPicker.innerHTML = CLASSES.map(cls => `
    <button class="class-chip ${cls === activeClass ? 'is-active' : ''}"
            role="tab" aria-selected="${cls === activeClass}" data-class="${cls}">
      ${cls}
    </button>
  `).join('');

  classPicker.querySelectorAll('.class-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      renderClassPicker(chip.dataset.class);
      renderTable(chip.dataset.class);
    });
  });
}

function renderTable(cls) {
  const rows = studentsInClass(cls).sort((a, b) => a.rollNo - b.rollNo);
  tableBody.innerHTML = rows.map(s => `
    <tr>
      <td>${s.rollNo}</td>
      <td>${s.name}</td>
      <td>${s.class}</td>
    </tr>
  `).join('');
}

renderClassPicker('VI');
renderTable('VI');
