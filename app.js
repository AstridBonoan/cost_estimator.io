const form = document.getElementById("form");
const result = document.getElementById("result");

// PRICING BASE (tu lógica simplificada)
const PRICING = {
  drywall: {
    small: { material: 30, hours: 2 },
    medium: { material: 70, hours: 4 },
    large: { material: 120, hours: 6 }
  },
  lighting: {
    small: { material: 40, hours: 2 },
    medium: { material: 80, hours: 4 },
    large: { material: 150, hours: 6 }
  },
  paint: {
    small: { material: 100, hours: 4 },
    medium: { material: 200, hours: 8 },
    large: { material: 400, hours: 16 }
  }
};

// LABOR
const LABOR_RATE = 32 * 2; // 2 workers

form.addEventListener("submit", function(e){
  e.preventDefault();

  const project = document.getElementById("projectType").value;
  const size = document.getElementById("size").value;

  const data = PRICING[project][size];

  const labor = data.hours * LABOR_RATE;
  const total = labor + data.material;

  result.innerHTML = `
    <h2>Estimate</h2>
    <p>Materials: $${data.material}</p>
    <p>Labor: $${labor}</p>
    <p><strong>Total: $${total}</strong></p>
  `;
});
