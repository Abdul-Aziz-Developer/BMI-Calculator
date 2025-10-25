function calculateBMI() {
  const age = parseInt(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const feet = parseFloat(document.getElementById("feet").value);
  const inches = parseFloat(document.getElementById("inches").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const result = document.getElementById("result");

  if (!age || age < 2 || age > 120 || !feet || !inches || !weight) {
    result.textContent = "Please enter valid inputs in all fields.";
    result.style.color = "red";
    return;
  }

  const totalInches = (feet * 12) + inches;
  const heightMeters = totalInches * 0.0254;
  const weightKg = weight; 
  const bmi = (weightKg / (heightMeters * heightMeters)).toFixed(2);

  let category = "";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  result.textContent = `Age: ${age}, Gender: ${gender}\nYour BMI is ${bmi} (${category})`;
  result.style.color = "#333";

  // Gauge
  const gauge = document.getElementById("bmiGauge");
  gauge.style.width = `${Math.min(bmi * 3, 100)}%`;
  gauge.style.backgroundColor = bmi < 18.5 ? "#00bcd4" :
                                bmi < 25 ? "#4caf50" :
                                bmi < 30 ? "#ff9800" : "#f44336";

  // Health Tip
  const tip = document.getElementById("healthTip");
  tip.textContent = bmi < 18.5
    ? "Eat more nutritious food!"
    : bmi < 25
    ? "Great! Keep it up!"
    : bmi < 30
    ? "Try walking 30 minutes daily!"
    : "Consult a doctor for healthy weight tips.";

  // Save to History
  const history = JSON.parse(localStorage.getItem("bmiHistory") || "[]");
  history.push({ age, gender, bmi, category });
  localStorage.setItem("bmiHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById("historyList");
  list.innerHTML = "";
  const history = JSON.parse(localStorage.getItem("bmiHistory") || "[]");
  history.slice(-5).reverse().forEach(item => {
    const li = document.createElement("li");
    li.textContent = `Age: ${item.age}, BMI: ${item.bmi} (${item.category})`;
    list.appendChild(li);
  });
}

function clearFields() {
  document.getElementById("age").value = "";
  document.getElementById("gender").value = "male";
  document.getElementById("feet").value = "";
  document.getElementById("inches").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("result").textContent = "";
  document.getElementById("bmiGauge").style.width = "0%";
  document.getElementById("healthTip").textContent = "";
}