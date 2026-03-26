const form = document.getElementById("estimatorForm");
const results = document.getElementById("results");

const steps = document.querySelectorAll(".step");
const stepPills = document.querySelectorAll(".step-pill");

const next1 = document.getElementById("next1");
const next2 = document.getElementById("next2");
const back2 = document.getElementById("back2");
const back3 = document.getElementById("back3");
const restart = document.getElementById("restart");

const selector = document.getElementById("selector");
const selectorTrigger = document.getElementById("selectorTrigger");
const selectedProject = document.getElementById("selectedProject");
const projectTypeInput = document.getElementById("projectType");
const projectOptions = document.querySelectorAll(".project-option.selectable");

const drywallSection = document.getElementById("drywallSection");
const lightingSection = document.getElementById("lightingSection");
const paintSection = document.getElementById("paintSection");

const damageSize = document.getElementById("damageSize");
const fixtureCount = document.getElementById("fixtureCount");
const roomSize = document.getElementById("roomSize");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");

const materialsOutput = document.getElementById("materials");
const laborOutput = document.getElementById("labor");
const totalOutput = document.getElementById("total");

let currentStep = 1;

const PRICING = {
  drywall: {
    small: {
      label: "Small drywall repair",
      materialMin: 18,
      materialMax: 35,
      hours: 1.5,
      laborRate: 32 * 2
    },
    medium: {
      label: "Medium drywall repair",
      materialMin: 35,
      materialMax: 70,
      hours: 2.5,
      laborRate: 32 * 2
    },
    large: {
      label: "Large drywall repair",
      materialMin: 70,
      materialMax: 125,
      hours: 4,
      laborRate: 32 * 2
    }
  },

  lighting: {
    "1": {
      label: "1 light fixture",
      materialMin: 45,
      materialMax: 110,
      hours: 3.5,
      laborRate: 45 * 2
    },
    "2": {
      label: "2 light fixtures",
      materialMin: 85,
      materialMax: 210,
      hours: 6.2,
      laborRate: 45 * 2
    },
    "3": {
      label: "3 light fixtures",
      materialMin: 125,
      materialMax: 310,
      hours: 8.8,
      laborRate: 45 * 2
    }
  },

  paint: {
    small: {
      label: "Small room",
      materialMin: 160,
      materialMax: 280,
      laborMin: 360,
      laborMax: 470
    },
    medium: {
      label: "Medium room",
      materialMin: 180,
      materialMax: 320,
      laborMin: 520,
      laborMax: 630
    },
    large: {
      label: "Large room",
      materialMin: 260,
      materialMax: 450,
      laborMin: 650,
      laborMax: 820
    }
  }
};

function currency(value) {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

function showStep(stepNumber) {
  currentStep = stepNumber;

  steps.forEach((step) => {
    const stepValue = Number(step.dataset.step);
    step.classList.toggle("active", stepValue === stepNumber);
  });

  updateStepper(stepNumber);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateStepper(stepNumber) {
  stepPills.forEach((pill, index) => {
    const pillStep = index + 1;

    pill.classList.remove("active", "done");

    if (pillStep < stepNumber) {
      pill.classList.add("done");
    } else if (pillStep === stepNumber) {
      pill.classList.add("active");
    }
  });
}

function updateProjectSections() {
  const type = projectTypeInput.value;

  drywallSection.classList.toggle("hidden", type !== "drywall");
  lightingSection.classList.toggle("hidden", type !== "lighting");
  paintSection.classList.toggle("hidden", type !== "paint");
}

function setProject(projectValue) {
  projectTypeInput.value = projectValue;

  let label = "Drywall Repair";
  if (projectValue === "lighting") label = "Lighting Installation";
  if (projectValue === "paint") label = "Paint One Room";

  selectedProject.textContent = label;

  projectOptions.forEach((option) => {
    option.classList.toggle("active", option.dataset.value === projectValue);
  });

  selector.classList.remove("open");
  updateProjectSections();
}

function toggleSelector() {
  selector.classList.toggle("open");
}

function validateStep1() {
  return !!projectTypeInput.value;
}

function validateStep2() {
  const type = projectTypeInput.value;

  if (type === "drywall") return !!damageSize.value;
  if (type === "lighting") return !!fixtureCount.value;
  if (type === "paint") return !!roomSize.value;

  return false;
}

function validateStep3() {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  return !!(name && phone && email);
}

function calculateDrywallEstimate() {
  const selected = PRICING.drywall[damageSize.value];
  const laborMin = selected.hours * selected.laborRate;
  const laborMax = laborMin * 1.15;
  const totalMin = selected.materialMin + laborMin;
  const totalMax = selected.materialMax + laborMax;

  return {
    materials: `${currency(selected.materialMin)} - ${currency(selected.materialMax)}`,
    labor: `${currency(laborMin)} - ${currency(laborMax)}`,
    total: `${currency(totalMin)} - ${currency(totalMax)}`
  };
}

function calculateLightingEstimate() {
  const selected = PRICING.lighting[fixtureCount.value];
  const laborMin = selected.hours * selected.laborRate;
  const laborMax = laborMin * 1.15;
  const totalMin = selected.materialMin + laborMin;
  const totalMax = selected.materialMax + laborMax;

  return {
    materials: `${currency(selected.materialMin)} - ${currency(selected.materialMax)}`,
    labor: `${currency(laborMin)} - ${currency(laborMax)}`,
    total: `${currency(totalMin)} - ${currency(totalMax)}`
  };
}

function calculatePaintEstimate() {
  const selected = PRICING.paint[roomSize.value];
  const totalMin = selected.materialMin + selected.laborMin;
  const totalMax = selected.materialMax + selected.laborMax;

  return {
    materials: `${currency(selected.materialMin)} - ${currency(selected.materialMax)}`,
    labor: `${currency(selected.laborMin)} - ${currency(selected.laborMax)}`,
    total: `${currency(totalMin)} - ${currency(totalMax)}`
  };
}

function renderResults(data) {
  materialsOutput.textContent = `Estimated Materials: ${data.materials}`;
  laborOutput.textContent = `Estimated Labor: ${data.labor}`;
  totalOutput.textContent = `Estimated Total Range: ${data.total}`;

  form.classList.add("hidden");
  results.classList.remove("hidden");

  stepPills.forEach((pill, index) => {
    pill.classList.remove("active", "done");
    if (index < 3) {
      pill.classList.add("done");
    } else if (index === 3) {
      pill.classList.add("active");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetEstimator() {
  form.reset();
  form.classList.remove("hidden");
  results.classList.add("hidden");

  setProject("drywall");
  showStep(1);
}

selectorTrigger.addEventListener("click", toggleSelector);

projectOptions.forEach((option) => {
  option.addEventListener("click", () => {
    setProject(option.dataset.value);
  });
});

document.addEventListener("click", (event) => {
  if (!selector.contains(event.target)) {
    selector.classList.remove("open");
  }
});

next1.addEventListener("click", () => {
  if (!validateStep1()) {
    alert("Please select a project type before continuing.");
    return;
  }

  showStep(2);
});

next2.addEventListener("click", () => {
  if (!validateStep2()) {
    alert("Please complete the project basics before continuing.");
    return;
  }

  showStep(3);
});

back2.addEventListener("click", () => {
  showStep(1);
});

back3.addEventListener("click", () => {
  showStep(2);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validateStep3()) {
    alert("Please complete your name, phone number, and email.");
    return;
  }

  let estimate;

  if (projectTypeInput.value === "drywall") {
    estimate = calculateDrywallEstimate();
  } else if (projectTypeInput.value === "lighting") {
    estimate = calculateLightingEstimate();
  } else {
    estimate = calculatePaintEstimate();
  }

  renderResults(estimate);
});

restart.addEventListener("click", resetEstimator);

setProject("drywall");
showStep(1);
