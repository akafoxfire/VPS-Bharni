/* ===================================================================
   Vikas Public School — shared demo data
   NOTE: This is in-memory sample data for demonstration only. It resets
   on every page reload. To make student edits, teacher edits, and
   logins actually persist, this file needs to be replaced with calls
   to a real backend (Firebase Auth + Firestore is a natural fit here,
   the same stack already used in SalaryOS).
=================================================================== */

const CLASSES = ["Nursery","LKG","UKG","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];

const FIRST_NAMES = ["Aarav","Vivaan","Aditya","Vihaan","Arjun","Sai","Reyansh","Ayaan","Krishna","Ishaan",
  "Kabir","Rohan","Aryan","Dev","Yash","Anaya","Diya","Saanvi","Ananya","Ishita",
  "Kavya","Riya","Myra","Aadhya","Pari","Navya","Siya","Anika","Meera","Tara"];
const LAST_NAMES = ["Sharma","Verma","Yadav","Jat","Meena","Choudhary","Saini","Kumawat","Gupta","Agarwal",
  "Bansal","Rathore","Shekhawat","Sinsinwar","Pareek","Joshi","Mahla","Dhaka","Kalwar","Sikarwar"];

function seededRandom(seed){ let s = seed; return () => { s = (s*9301+49297)%233280; return s/233280; }; }

function buildStudents(){
  const students = [];
  let idCounter = 1;
  CLASSES.forEach((cls, classIndex) => {
    const rand = seededRandom(classIndex + 7);
    const count = 12;
    for(let roll = 1; roll <= count; roll++){
      const fn = FIRST_NAMES[Math.floor(rand()*FIRST_NAMES.length)];
      const ln = LAST_NAMES[Math.floor(rand()*LAST_NAMES.length)];
      const id = "S" + String(idCounter).padStart(4,"0");
      idCounter++;
      students.push({
        id,
        rollNo: roll,
        name: `${fn} ${ln}`,
        class: cls,
        fatherName: `${LAST_NAMES[Math.floor(rand()*LAST_NAMES.length)]} ji`,
        contact: "9" + String(Math.floor(100000000 + rand()*899999999)).slice(0,9),
        address: "Bharni, Srimadhopur, Sikar, Rajasthan",
        email: `${fn}.${ln}${roll}@example.com`.toLowerCase(),
        academic: {
          attendance: Math.floor(78 + rand()*20) + "%",
          lastExamPercent: Math.floor(55 + rand()*40) + "%",
          remarks: "Satisfactory progress this term."
        }
      });
    }
  });
  return students;
}

const STUDENTS = buildStudents();

const TEACHERS = [
  { id:"T000", name:"Anjali Sharma", role:"Principal", subject:"—", qualification:"M.Ed, Panjab University", experience:"19 years", classTeacherOf:null,
    note:"Every child who walks through our gate is someone's whole world, and we try never to forget that. Our promise to you — student and parent alike — is simple: we will know your name, notice when something's wrong, and celebrate the small wins as much as the big ones. Learning works best when a child feels safe enough to ask a question they're afraid is silly. That is the culture we build here, one classroom at a time." },
  { id:"T001", name:"Rohit Khatri", role:"Head of Science", subject:"Physics", qualification:"M.Sc Physics, IIT Roorkee", experience:"12 years", classTeacherOf:"XI" },
  { id:"T002", name:"Meera Pillai", role:"Head of Primary Wing", subject:"Primary Education", qualification:"B.El.Ed, Delhi University", experience:"15 years", classTeacherOf:"III" },
  { id:"T003", name:"Sanjay Deshmukh", role:"Counsellor & Careers Lead", subject:"Psychology", qualification:"M.A. Psychology", experience:"8 years", classTeacherOf:null },
  { id:"T004", name:"Priya Kalwar", role:"Class Teacher", subject:"Mathematics", qualification:"M.Sc Mathematics", experience:"9 years", classTeacherOf:"VI" },
  { id:"T005", name:"Deepak Saini", role:"Class Teacher", subject:"Hindi", qualification:"M.A. Hindi, B.Ed", experience:"11 years", classTeacherOf:"IX" },
  { id:"T006", name:"Neha Rathore", role:"Class Teacher", subject:"English", qualification:"M.A. English", experience:"7 years", classTeacherOf:"VIII" },
];

/* ---- Demo login accounts ----
   Student login: sees + edits their own contact/address details.
   Parent login: same view as their child's student record.
   Teacher login: sees their class list, edits academic fields only,
   for students in the class they are the class teacher of. */
const ACCOUNTS = [
  { username:"student1", password:"demo123", role:"student", refId:"S0097" },  // Class VI, roll 1
  { username:"parent1",  password:"demo123", role:"parent",  refId:"S0097" },  // parent of same student
  { username:"teacher1", password:"demo123", role:"teacher", refId:"T004" },   // class teacher of VI
];

function findStudentById(id){ return STUDENTS.find(s => s.id === id); }
function findTeacherById(id){ return TEACHERS.find(t => t.id === id); }
function studentsInClass(cls){ return STUDENTS.filter(s => s.class === cls); }
