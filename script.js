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
    listItem.textContent = `الاسم: ${patient.name}, العمر: ${patient.age}, السجل الطبي: ${patient.history}`;
    list.appendChild(listItem);
  });
  displayInterface.appendChild(list);
}

// عند إرسال النموذج
patientForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('patient-name').value;
  const age = document.getElementById('patient-age').value;
  const history = document.getElementById('patient-history').value;

  if (name && age) {
    savePatientData(name, age, history);
    alert('تم حفظ البيانات بنجاح!');
    patientForm.reset(); // إعادة تعيين النموذج
    displayPatients(); // تحديث العرض
  } else {
    alert('يرجى ملء جميع الحقول المطلوبة.');
  }
});

// عرض البيانات عند التحميل
document.addEventListener('DOMContentLoaded', displayPatients);
