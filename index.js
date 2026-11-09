const btnEl = document.getElementById('btn');
const appEl = document.getElementById('app');
const notes = getNotes();

function saveNotes() {
  if (notes.length === 0) {
    localStorage.removeItem('notes');
    return;
  }
  localStorage.setItem('notes',JSON.stringify(notes));
}

function getNotes() {
  const notes = localStorage.getItem('notes');
  if (!notes) return [];
  try{
    const parsedNotes = JSON.parse(notes);
    return Array.isArray(parsedNotes) ? parseNotes : [];
  } catch (error) {
    localStorage.removeItem('notes');
    return [];
  }
}

function updateNote(id, newText) {
  const target = notes.find((note) => note.id === id);
  target.text = newText;
  saveNotes();
}

function deleteNote(id, element) {
  const index = notes.findIndex((note) => note.id === id);
  notes.splice(index,1)
  element.remove();
  saveNotes();
}

function createNoteElement(id, text) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.value = text;
  element.placeholder = 'Write your note...';
  element.dataset.id = id;
  element.addEventListener('input', () => {
    updateNote(id, element.value)
  });
  element.addEventListener('dbclick', () => {
    deleteNote(id, element);
  });
  return element;
}

function renderNotes() {
  notes.forEach((note) => {
    const noteElement = createNoteElement(note.id, note.text);
    appEl.insertBefore(noteElement, btnEl);
  });
}

function addNote() {
  const noteObject = {id: Date.now(), text: ''};
  notes.push(noteObject);

  const noteElement = createNoteElement(noteObject.id, noteObject.text);
  appEl.insertBefore(noteElement, btnEl);
}

btnEl.addEventListener('click', addNote)

renderNotes();