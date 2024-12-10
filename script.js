// مرجع لعناصر النموذج
const patientForm = document.getElementById('patient-form');
const displayInterface = document.getElementById('display-interface');

// وظيفة لحفظ البيانات
function savePatientData(name, age, history) {
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  const newPatient = { name, age, history, id: Date.now() };
  patients.push(newPatient);
  localStorage.setItem('patients', JSON.stringify(patients));
  return newPatient;
}

// وظيفة لتحديث البيانات
function updatePatientData(id, name, age, history) {
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  const updatedPatients = patients.map(patient => 
    patient.id === id ? { ...patient, name, age, history } : patient
  );
  localStorage.setItem('patients', JSON.stringify(updatedPatients));
}

// وظيفة لحذف البيانات
function deletePatientData(id) {
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  const updatedPatients = patients.filter(patient => patient.id !== id);
  localStorage.setItem('patients', JSON.stringify(updatedPatients));
}

// وظيفة لعرض البيانات
function displayPatients() {
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  displayInterface.innerHTML = '<h2>واجهة العرض</h2>';
  if (patients.length === 0) {
    displayInterface.innerHTML += '<p>لا توجد بيانات مرضى لعرضها.</p>';
    return;
  }
  const list = document.createElement('ul');
  patients.forEach(patient => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      الاسم: ${patient.name}, العمر: ${patient.age}, السجل الطبي: ${patient.history}
      <button onclick="editPatient(${patient.id})">تعديل</button>
      <button onclick="removePatient(${patient.id})">حذف</button>
    `;
    list.appendChild(listItem);
  });
  displayInterface.appendChild(list);
}

// وظيفة لتعديل المريض
function editPatient(id) {
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  const patient = patients.find(patient => patient.id === id);
  if (patient) {
    document.getElementById('patient-name').value = patient.name;
    document.getElementById('patient-age').value = patient.age;
    document.getElementById('patient-history').value = patient.history;

    // تعديل البيانات عند الضغط على زر الحفظ
    patientForm.onsubmit = function(e) {
      e.preventDefault();
      updatePatientData(id, 
        document.getElementById('patient-name').value,
        document.getElementById('patient-age').value,
        document.getElementById('patient-history').value
      );
      alert('تم تحديث البيانات بنجاح!');
      patientForm.reset();
      patientForm.onsubmit = defaultSubmit; // إعادة زر الحفظ للوضع الأصلي
      displayPatients();
    };
  }
}

// وظيفة لحذف مريض
function removePatient(id) {
  if (confirm('هل أنت متأكد أنك تريد حذف هذا المريض؟')) {
    deletePatientData(id);
    alert('تم حذف المريض!');
    displayPatients();
  }
}

// الوظيفة الافتراضية لإضافة مريض جديد
function defaultSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('patient-name').value;
  const age = document.getElementById('patient-age').value;
  const history = document.getElementById('patient-history').value;

  if (name && age) {
    savePatientData(name, age, history);
    alert('تم حفظ البيانات بنجاح!');
    patientForm.reset();
    displayPatients();
  } else {
    alert('يرجى ملء جميع الحقول المطلوبة.');
  }
}

patientForm.onsubmit = defaultSubmit;

// عرض البيانات عند التحميل
document.addEventListener('DOMContentLoaded', displayPatients);
