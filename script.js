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
    listItem.innerHTML = `
      <strong>${patient.name}</strong> - العمر: ${patient.age} - السجل الطبي: ${patient.history}
      <button onclick="editPatient(${patient.id})">تعديل</button>
      <button onclick="deletePatient(${patient.id})">حذف</button>
    `;
    list.appendChild(listItem);
  });
  displayInterface.appendChild(list);
}

// وظيفة لحذف البيانات
function deletePatient(id) {
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  const filteredPatients = patients.filter(patient => patient.id !== id);
  localStorage.setItem('patients', JSON.stringify(filteredPatients));
  displayPatients(); // إعادة عرض البيانات بعد الحذف
}

// وظيفة لتعديل البيانات
function editPatient(id) {
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  const patient = patients.find(p => p.id === id);
  if (patient) {
    // ملء النموذج بالبيانات المعدلة
    document.getElementById('patient-name').value = patient.name;
    document.getElementById('patient-age').value = patient.age;
    document.getElementById('patient-history').value = patient.history;

    // تعديل النص في زر النموذج ليكون "تعديل"
    patientForm.querySelector('button').textContent = 'تعديل البيانات';

    // تغيير الوظيفة المرفقة بزر الحفظ ليتم التعديل بدلاً من الحفظ
    patientForm.removeEventListener('submit', handleSubmit);
    patientForm.addEventListener('submit', function(e) {
      e.preventDefault();
      patient.name = document.getElementById('patient-name').value;
      patient.age = document.getElementById('patient-age').value;
      patient.history = document.getElementById('patient-history').value;

      // تحديث البيانات في LocalStorage
      localStorage.setItem('patients', JSON.stringify(patients));
      alert('تم تعديل البيانات بنجاح!');
      patientForm.reset(); // إعادة تعيين النموذج
      displayPatients(); // تحديث العرض
      patientForm.querySelector('button').textContent = 'حفظ البيانات'; // إعادة النص إلى "حفظ"
    });
  }
}

// وظيفة عند إرسال النموذج (حفظ البيانات أو تعديلها)
function handleSubmit(e) {
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
}

// تعيين وظيفة submit الأصلية للنموذج
patientForm.addEventListener('submit', handleSubmit);

// عرض البيانات عند التحميل
document.addEventListener('DOMContentLoaded', displayPatients);
