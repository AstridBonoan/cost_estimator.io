const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqeyglen";

const PRICING = {
  labor: {
    general: { ratePerPerson: 32, crewSize: 2 },
    electrical: { ratePerPerson: 45, crewSize: 2 }
  },

  drywall: {
    small: {
      label: "Small patch",
      materialMin: 18,
      materialMax: 35,
      hours: 1.5,
      materials: ["Patch repair kit", "Joint compound", "Basic tape", "Minor consumables"]
    },
    medium: {
      label: "Medium patch",
      materialMin: 35,
      materialMax: 70,
      hours: 2.5,
      materials: ["1 drywall sheet or equivalent piece", "Joint compound", "Drywall tape", "Screws", "Minor consumables"]
    },
    large: {
      label: "Large patch",
      materialMin: 70,
      materialMax: 125,
      hours: 4,
      materials: ["1 to 2 drywall sheets", "Joint compound", "Drywall tape", "Screws", "Minor consumables"]
    },
    xlarge: {
      label: "Very large patch",
      materialMin: 125,
      materialMax: 220,
      hours: 6,
      materials: ["2 to 3 drywall sheets", "Additional joint compound", "Drywall tape", "Screws", "Consumables and reinforcement"]
    }
  },

  drywallAdjustments: {
    damageLocation: {
      ceiling: { hoursMultiplier: 1.25, materialMinAdd: 8, materialMaxAdd: 18, label: "Adjustment for ceiling work" }
    },
    texture: {
      light: { hoursMultiplier: 1.15, materialMinAdd: 10, materialMaxAdd: 20, label: "Adjustment for light texture" },
      heavy: { hoursMultiplier: 1.3, materialMinAdd: 20, materialMaxAdd: 40, label: "Adjustment for heavy texture" }
    },
    workHeight: {
      medium: { hoursMultiplier: 1.1, materialMinAdd: 0, materialMaxAdd: 0, label: "Adjustment for 8-10 ft height" },
      high: { hoursMultiplier: 1.2, materialMinAdd: 8, materialMaxAdd: 20, label: "Adjustment for height above 10 ft" }
    },
    obstacles: {
      yes: { hoursMultiplier: 1.15, materialMinAdd: 0, materialMaxAdd: 0, label: "Adjustment for moving furniture or obstacles" }
    },
    insulation: {
      yes: { hoursAdd: 0.5, materialMinAdd: 12, materialMaxAdd: 25, label: "Includes possible insulation adjustment" }
    },
    paint: {
      patchOnly: { hoursAdd: 1, materialMinAdd: 15, materialMaxAdd: 35, label: "Includes painting the patch area only" },
      fullSurface: { hoursAdd: 2.5, materialMinAdd: 35, materialMaxAdd: 85, label: "Includes painting the full affected area" },
      connectedSurfaces: { hoursAdd: 4.5, materialMinAdd: 65, materialMaxAdd: 160, label: "Includes painting connected areas" },
      notSure: { hoursAdd: 2, materialMinAdd: 25, materialMaxAdd: 65, label: "Painting included, final scope to be confirmed" },
      noExistingPaint: { materialMinAdd: 15, materialMaxAdd: 35, label: "No existing paint available" },
      yesExistingPaint: { label: "Customer indicates existing paint is available" }
    },
    scopeContext: {
      standardSurface: { hoursAdd: 0.5, materialMinAdd: 10, materialMaxAdd: 20 },
      largeSurface: { hoursAdd: 1, materialMinAdd: 20, materialMaxAdd: 45 },
      connectedSurfaces: { hoursAdd: 1.5, materialMinAdd: 30, materialMaxAdd: 70 }
    }
  },

  lighting: {
    replace: {
      label: "Replace existing light fixture",
      materialMin: 15,
      materialMax: 40,
      hours: 1.5,
      materials: ["Wire nuts / connectors", "Mounting hardware", "Minor electrical consumables"]
    },
    add: {
      label: "Add new light fixture",
      materialMin: 45,
      materialMax: 110,
      hours: 3.5,
      materials: ["Electrical box", "Basic wiring (cable)", "Wire nuts / connectors", "Fasteners / staples", "Mounting hardware", "Electrical consumables"]
    },
    adjustments: {
      location: {
        ceiling: { hoursMultiplier: 1.1, materialMinAdd: 5, materialMaxAdd: 15, label: "Ceiling installation adjustment" },
        wall: { hoursMultiplier: 1.05, materialMinAdd: 0, materialMaxAdd: 10, label: "Wall installation adjustment" },
        exterior: { hoursMultiplier: 1.25, materialMinAdd: 25, materialMaxAdd: 60, label: "Exterior installation adjustment" }
      },
      fixtureType: {
        standard: { hoursMultiplier: 1, label: "Standard fixture", materialMinAdd: 0, materialMaxAdd: 0 },
        recessed: { hoursMultiplier: 1.25, label: "Recessed light installation", materialMinAdd: 15, materialMaxAdd: 40 },
        vanity: { hoursMultiplier: 1.1, label: "Vanity / wall light adjustment", materialMinAdd: 0, materialMaxAdd: 15 },
        pendant: { hoursMultiplier: 1.3, label: "Pendant / chandelier installation", materialMinAdd: 10, materialMaxAdd: 30 },
        exterior: { hoursMultiplier: 1.2, label: "Exterior fixture setup", materialMinAdd: 20, materialMaxAdd: 50 },
        notSure: { hoursMultiplier: 1.15, label: "Fixture type to be confirmed", materialMinAdd: 0, materialMaxAdd: 20 }
      },
      access: {
        veryEasy: { hoursMultiplier: 1, label: "Existing wiring already in place", materialMinAdd: 0, materialMaxAdd: 0 },
        easy: { hoursMultiplier: 1.15, label: "Minor access adjustments", materialMinAdd: 10, materialMaxAdd: 25 },
        moderate: { hoursMultiplier: 1.35, label: "Multiple openings required", materialMinAdd: 25, materialMaxAdd: 60 },
        difficult: { hoursMultiplier: 1.6, label: "Limited access / complex routing", materialMinAdd: 50, materialMaxAdd: 120 },
        notSure: { hoursMultiplier: 1.3, label: "Access conditions to be confirmed", materialMinAdd: 20, materialMaxAdd: 50 }
      },
      switch: {
        yes: { hoursAdd: 1.5, materialMinAdd: 20, materialMaxAdd: 45, label: "New switch installation" },
        no: { hoursAdd: 0, materialMinAdd: 0, materialMaxAdd: 0, label: "" },
        notSure: { hoursAdd: 0.8, materialMinAdd: 10, materialMaxAdd: 25, label: "Switch requirement to be confirmed" }
      },
      wireRun: {
        none: { hoursAdd: 0, materialMinAdd: 0, materialMaxAdd: 0, label: "" },
        short: { hoursAdd: 0.5, materialMinAdd: 10, materialMaxAdd: 25, label: "Short wiring run" },
        medium: { hoursAdd: 1.2, materialMinAdd: 20, materialMaxAdd: 50, label: "Medium wiring run" },
        long: { hoursAdd: 2, materialMinAdd: 40, materialMaxAdd: 90, label: "Long wiring run" },
        notSure: { hoursAdd: 1, materialMinAdd: 20, materialMaxAdd: 45, label: "Wiring distance to be confirmed" }
      },
      atticAccess: {
        yes: { hoursMultiplier: 0.9, label: "Access available from above or below", materialMinAdd: 0, materialMaxAdd: 0 },
        no: { hoursMultiplier: 1.25, label: "No access available from above or below", materialMinAdd: 0, materialMaxAdd: 0 },
        notSure: { hoursMultiplier: 1.1, label: "Access route conditions unknown", materialMinAdd: 0, materialMaxAdd: 0 }
      },
      repair: {
        yes: { hoursAdd: 2, materialMinAdd: 25, materialMaxAdd: 70, label: "Repairs included if openings are needed" },
        no: { hoursAdd: 0, materialMinAdd: 0, materialMaxAdd: 0, label: "" },
        notSure: { hoursAdd: 1, materialMinAdd: 15, materialMaxAdd: 40, label: "Repair scope to be confirmed" }
      },
      paintScope: {
        patchOnly: { hoursAdd: 1, materialMinAdd: 15, materialMaxAdd: 35, label: "Includes painting the patch area only" },
        fullSurface: { hoursAdd: 2.5, materialMinAdd: 35, materialMaxAdd: 85, label: "Includes painting the full affected area" },
        connectedSurfaces: { hoursAdd: 4.5, materialMinAdd: 65, materialMaxAdd: 160, label: "Includes painting connected areas" },
        notSure: { hoursAdd: 2, materialMinAdd: 25, materialMaxAdd: 65, label: "Painting scope to be confirmed" }
      },
      height: {
        standard: { hoursMultiplier: 1, label: "" },
        medium: { hoursMultiplier: 1.1, label: "8-10 ft height adjustment" },
        high: { hoursMultiplier: 1.25, label: "Over 10 ft height adjustment" }
      },
      obstacles: {
        yes: { hoursMultiplier: 1.15, label: "Furniture / obstacle adjustment" },
        no: { hoursMultiplier: 1, label: "" }
      },
      fixtureSupply: {
        yes: { materialMinAdd: 0, materialMaxAdd: 0, label: "" },
        no: { materialMinAdd: 40, materialMaxAdd: 120, label: "Fixture allowance included" },
        notSure: { materialMinAdd: 20, materialMaxAdd: 60, label: "Fixture allowance to be confirmed" }
      }
    }
  },

  paint: {
    scopeAdds: {
      walls: { hours: 3, matMin: 70, matMax: 140, label: "Walls included" },
      ceiling: { hours: 2, matMin: 40, matMax: 90, label: "Ceiling included" },
      trim: { hours: 1.25, matMin: 25, matMax: 55, label: "Baseboards / trim included" },
      doors: { hours: 1.0, matMin: 20, matMax: 45, label: "Doors included" },
      windows: { hours: 1.25, matMin: 20, matMax: 50, label: "Windows included" }
    },
    roomSize: {
      small: { hours: 0, matMin: 0, matMax: 0, label: "Small room" },
      medium: { hours: 1.5, matMin: 25, matMax: 60, label: "Medium room" },
      large: { hours: 3, matMin: 55, matMax: 120, label: "Large room" },
      open: { hours: 5, matMin: 95, matMax: 200, label: "Open / oversized room" },
      not_sure: { hours: 2, matMin: 35, matMax: 80, label: "Room size to be confirmed" }
    },
    roomCountMultiplier: { "1": 1, "2": 1.9, "3": 2.7, "4": 3.45, "5plus": 4.1 },
    colorChange: {
      no: { hours: 0, matMin: 0, matMax: 0, label: "" },
      yes: { hours: 1.5, matMin: 25, matMax: 65, label: "Significant color change" },
      notSure: { hours: 1, matMin: 15, matMax: 40, label: "Color change to be confirmed" }
    },
    surfaceCondition: {
      minimal: { hours: 0, matMin: 0, matMax: 0, label: "" },
      light: { hours: 1, matMin: 15, matMax: 40, label: "Light surface preparation" },
      moderate: { hours: 2.5, matMin: 40, matMax: 95, label: "Moderate surface preparation" },
      heavy: { hours: 5, matMin: 90, matMax: 200, label: "Heavy surface preparation" },
      notSure: { hours: 2, matMin: 30, matMax: 75, label: "Surface preparation to be confirmed" }
    },
    ceilingHeight: {
      under8: { hours: 0, matMin: 0, matMax: 0, label: "" },
      ft8to10: { hours: 0.75, matMin: 0, matMax: 15, label: "8-10 ft ceiling height" },
      over10: { hours: 1.75, matMin: 10, matMax: 35, label: "Over 10 ft ceiling height" },
      notSure: { hours: 1, matMin: 5, matMax: 20, label: "Ceiling height to be confirmed" }
    },
    finishLevel: {
      standard: { hours: 0, matMin: 0, matMax: 0, label: "" },
      cleanDetailed: { hours: 1.5, matMin: 10, matMax: 30, label: "Clean + detailed finish" },
      highEnd: { hours: 3, matMin: 20, matMax: 50, label: "High-end finish expectation" },
      notSure: { hours: 1, matMin: 10, matMax: 20, label: "Finish level to be confirmed" }
    },
    propertyType: {
      house: { hours: 0, matMin: 0, matMax: 0, label: "" },
      apartmentCondo: { hours: 1, matMin: 0, matMax: 0, label: "Apartment / condo logistics" },
      hoaManaged: { hours: 2, matMin: 0, matMax: 0, label: "Managed building / HOA coordination" },
      notSure: { hours: 1, matMin: 0, matMax: 0, label: "Property logistics to be confirmed" }
    },
    accessDifficulty: {
      easy: { hours: 0, matMin: 0, matMax: 0, label: "" },
      moderate: { hours: 1, matMin: 0, matMax: 0, label: "Moderate access difficulty" },
      difficult: { hours: 2.5, matMin: 0, matMax: 0, label: "Difficult access conditions" },
      notSure: { hours: 1.5, matMin: 0, matMax: 0, label: "Access conditions to be confirmed" }
    },
    paintHandling: {
      clientProvides: { hours: 0, matMin: 0, matMax: 0, label: "Paint provided by customer" },
      painterProvides: { hours: 0, matMin: 75, matMax: 220, label: "Paint supplied by painter" },
      notSure: { hours: 0, matMin: 40, matMax: 120, label: "Paint handling to be confirmed" }
    },
    obstacles: {
      empty: { hours: 0, matMin: 0, matMax: 0, label: "" },
      lightFurniture: { hours: 0.75, matMin: 10, matMax: 25, label: "Light furniture protection / moving" },
      fullyFurnished: { hours: 2, matMin: 20, matMax: 45, label: "Full room protection / moving" },
      notSure: { hours: 1, matMin: 10, matMax: 30, label: "Protection needs to be confirmed" }
    },
    yearBuilt: {
      after2000: { hours: 0, matMin: 0, matMax: 0, label: "" },
      from1980to2000: { hours: 0, matMin: 0, matMax: 0, label: "" },
      before1980: { hours: 1, matMin: 15, matMax: 40, label: "Possible lead-based paint conditions" },
      before1960: { hours: 2, matMin: 30, matMax: 75, label: "Higher likelihood of lead-based paint conditions" },
      notSure: { hours: 1.25, matMin: 20, matMax: 50, label: "Year built to be confirmed" }
    },
    leadPrepMode: {
      standard: { hours: 0, matMin: 0, matMax: 0, label: "" },
      enhanced: { hours: 4, matMin: 120, matMax: 300, label: "Enhanced preparation / lead-safe workflow" },
      notSure: { hours: 2, matMin: 60, matMax: 150, label: "Potential enhanced preparation to be confirmed" }
    },
    materials: ["Paint", "Primer", "Caulk", "Masking tape", "Plastic / protection materials", "Patch / prep consumables"]
  },

  serviceZoneMultipliers: { core: 1.0, extended: 1.08, outer: 1.15, distant: 1.22 }
};

const drywallContextConfig = {
  wall: {
    scopeLabel: "Size of the affected wall or area",
    scopeOptions: [
      { value: "small-area", label: "Small wall area (less than 4 ft)" },
      { value: "standard-surface", label: "Standard wall (up to 8 ft)" },
      { value: "large-surface", label: "Large wall (more than 8 ft)" },
      { value: "connected-surfaces", label: "Multiple connected walls" }
    ],
    paintLabel: "What area should be painted?",
    paintOptions: [
      { value: "patch-only", label: "Only the patch area" },
      { value: "full-surface", label: "Entire wall" },
      { value: "connected-surfaces", label: "Connected walls" },
      { value: "not-sure", label: "Not sure" }
    ],
    heightLabel: "Height of the work area",
    summaryMap: {
      standardSurface: "Adjustment for standard wall",
      largeSurface: "Adjustment for large wall",
      connectedSurfaces: "Adjustment for multiple connected walls",
      fullSurfacePaint: "Includes painting the full wall",
      connectedSurfacePaint: "Includes painting connected walls"
    }
  },
  ceiling: {
    scopeLabel: "Size of the affected ceiling area",
    scopeOptions: [
      { value: "small-area", label: "Small ceiling area (less than 4 ft)" },
      { value: "standard-surface", label: "Standard ceiling section (up to 8 ft)" },
      { value: "large-surface", label: "Large ceiling area (more than 8 ft)" },
      { value: "connected-surfaces", label: "Multiple connected ceiling areas" }
    ],
    paintLabel: "What ceiling area should be painted?",
    paintOptions: [
      { value: "patch-only", label: "Only the patch area" },
      { value: "full-surface", label: "Entire ceiling area" },
      { value: "connected-surfaces", label: "Connected ceiling areas" },
      { value: "not-sure", label: "Not sure" }
    ],
    heightLabel: "Height of the ceiling work area",
    summaryMap: {
      standardSurface: "Adjustment for standard ceiling section",
      largeSurface: "Adjustment for large ceiling area",
      connectedSurfaces: "Adjustment for multiple connected ceiling areas",
      fullSurfacePaint: "Includes painting the full ceiling area",
      connectedSurfacePaint: "Includes painting connected ceiling areas"
    }
  }
};

const lightingPaintScopeConfig = {
  wall: {
    label: "What area should be painted?",
    options: [
      { value: "patchOnly", label: "Patch area only" },
      { value: "fullSurface", label: "The whole wall" },
      { value: "notSure", label: "Not sure" }
    ]
  },
  ceiling: {
    label: "What area should be painted?",
    options: [
      { value: "patchOnly", label: "Patch area only" },
      { value: "fullSurface", label: "The whole ceiling" },
      { value: "notSure", label: "Not sure" }
    ]
  },
  exterior: {
    label: "What area should be painted?",
    options: [
      { value: "patchOnly", label: "Repair area only" },
      { value: "fullSurface", label: "Full affected area" },
      { value: "notSure", label: "Not sure" }
    ]
  }
};

let currentStep = 1;
let latestEstimate = null;
let coldLeadSubmitted = false;
let hotLeadSubmitted = false;

const form = document.getElementById("estimatorForm");
const results = document.getElementById("results");
const stepper = document.getElementById("stepper");
const stepPanels = document.querySelectorAll(".step-panel");
const stepPills = document.querySelectorAll("[data-step-pill]");

const materialsOutput = document.getElementById("materials");
const laborOutput = document.getElementById("labor");
const totalOutput = document.getElementById("total");
const breakdownList = document.getElementById("breakdownList");
const resultsProjectName = document.getElementById("resultsProjectName");

const hotLeadBtn = document.getElementById("hotLeadBtn");
const doneBtn = document.getElementById("doneBtn");
const hotCompletionScreen = document.getElementById("hotCompletionScreen");
const doneCompletionScreen = document.getElementById("doneCompletionScreen");
const startNewFromHot = document.getElementById("startNewFromHot");
const startNewFromDone = document.getElementById("startNewFromDone");

const projectType = document.getElementById("projectType");
const projectDisplayName = document.getElementById("projectDisplayName");
const selectedProjectLabel = document.getElementById("selectedProjectLabel");
const selectedProjectSubLabel = document.getElementById("selectedProjectSubLabel");
const selectedProjectMessageText = document.getElementById("selectedProjectMessageText");
const projectSelectorShell = document.getElementById("projectSelectorShell");
const projectSelectorTrigger = document.getElementById("projectSelectorTrigger");

const drywallProjectOption = document.getElementById("drywallProjectOption");
const lightingProjectOption = document.getElementById("lightingProjectOption");
const paintProjectOption = document.getElementById("paintProjectOption");

const validationStep1 = document.getElementById("validationStep1");
const validationStep2 = document.getElementById("validationStep2");
const validationStep3 = document.getElementById("validationStep3");
const validationStep4 = document.getElementById("validationStep4");

const basicsSubtitle = document.getElementById("basicsSubtitle");
const detailsSubtitle = document.getElementById("detailsSubtitle");

const propertyType = document.getElementById("propertyType");
const propertyTypeMessage = document.getElementById("propertyTypeMessage");

const drywallBasicsSection = document.getElementById("drywallBasicsSection");
const lightingBasicsSection = document.getElementById("lightingBasicsSection");
const paintBasicsSection = document.getElementById("paintBasicsSection");

const drywallDetailsSection = document.getElementById("drywallDetailsSection");
const lightingDetailsSection = document.getElementById("lightingDetailsSection");
const paintDetailsSection = document.getElementById("paintDetailsSection");

const damageLocation = document.getElementById("damageLocation");
const damageSize = document.getElementById("damageSize");
const scopeContext = document.getElementById("scopeContext");
const texture = document.getElementById("texture");
const paintRequired = document.getElementById("paintRequired");
const paintBlend = document.getElementById("paintBlend");
const paintAvailable = document.getElementById("paintAvailable");
const insulation = document.getElementById("insulation");
const ceilingHeight = document.getElementById("ceilingHeight");
const obstacles = document.getElementById("obstacles");
const notes = document.getElementById("notes");
const projectFiles = document.getElementById("projectFiles");

const scopeContextLabel = document.getElementById("scopeContextLabel");
const paintBlendLabel = document.getElementById("paintBlendLabel");
const workHeightLabel = document.getElementById("workHeightLabel");
const paintBlendField = document.getElementById("paintBlendField");

const lightingType = document.getElementById("lightingType");
const lightingLocation = document.getElementById("lightingLocation");
const fixtureCount = document.getElementById("fixtureCount");
const fixtureType = document.getElementById("fixtureType");
const accessDifficulty = document.getElementById("accessDifficulty");
const wireRun = document.getElementById("wireRun");
const atticAccess = document.getElementById("atticAccess");
const fixtureSupplied = document.getElementById("fixtureSupplied");
const newSwitch = document.getElementById("newSwitch");
const repairIncluded = document.getElementById("repairIncluded");
const paintAfterRepair = document.getElementById("paintAfterRepair");
const paintLightingScope = document.getElementById("paintLightingScope");
const paintLightingScopeLabel = document.getElementById("paintLightingScopeLabel");
const atticAccessLabel = document.getElementById("atticAccessLabel");
const lightingHeight = document.getElementById("lightingHeight");
const lightingObstacles = document.getElementById("lightingObstacles");
const notesLighting = document.getElementById("notesLighting");
const projectFilesLighting = document.getElementById("projectFilesLighting");

const lightingWireRunField = document.getElementById("lightingWireRunField");
const lightingAtticAccessField = document.getElementById("lightingAtticAccessField");
const lightingSwitchField = document.getElementById("lightingSwitchField");
const lightingRepairField = document.getElementById("lightingRepairField");
const lightingPaintYesNoField = document.getElementById("lightingPaintYesNoField");
const lightingPaintScopeField = document.getElementById("lightingPaintScopeField");

const paintScopeCheckboxes = document.querySelectorAll('input[name="paintScope"]');
const paintRoomSize = document.getElementById("paintRoomSize");
const paintRoomCount = document.getElementById("paintRoomCount");
const paintColorChange = document.getElementById("paintColorChange");
const paintCeilingHeight = document.getElementById("paintCeilingHeight");
const paintCeilingHeightField = document.getElementById("paintCeilingHeightField");
const paintSurfaceCondition = document.getElementById("paintSurfaceCondition");
const paintSurfaceConditionField = document.getElementById("paintSurfaceConditionField");
const paintFinishLevel = document.getElementById("paintFinishLevel");
const paintPropertyType = document.getElementById("paintPropertyType");
const paintAccessDifficulty = document.getElementById("paintAccessDifficulty");
const paintHandling = document.getElementById("paintHandling");
const paintObstacles = document.getElementById("paintObstacles");
const paintYearBuilt = document.getElementById("paintYearBuilt");
const paintLeadPrepMode = document.getElementById("paintLeadPrepMode");
const paintLeadPrepField = document.getElementById("paintLeadPrepField");
const paintNotes = document.getElementById("paintNotes");
const projectFilesPaint = document.getElementById("projectFilesPaint");

const nextToStep2 = document.getElementById("nextToStep2");
const backToStep1 = document.getElementById("backToStep1");
const nextToStep3 = document.getElementById("nextToStep3");
const backToStep2 = document.getElementById("backToStep2");
const nextToStep4 = document.getElementById("nextToStep4");
const backToStep3 = document.getElementById("backToStep3");

function currency(value) {
  return "$" + Math.round(value).toLocaleString("en-US");
}

function setOptions(selectEl, options, preferredValue = null) {
  const safeValue = options.some((o) => o.value === preferredValue) ? preferredValue : options[0].value;
  selectEl.innerHTML = options.map((o) => `<option value="${o.value}">${o.label}</option>`).join("");
  selectEl.value = safeValue;
}

function clearValidation(box) {
  if (!box) return;
  box.textContent = "";
  box.classList.remove("active");
}

function showValidation(box, message) {
  if (!box) return;
  box.textContent = message;
  box.classList.add("active");
}

function hideAllEndStates() {
  if (results) {
    results.classList.add("hidden");
    results.classList.remove("active");
  }
  if (hotCompletionScreen) hotCompletionScreen.classList.remove("active");
  if (doneCompletionScreen) doneCompletionScreen.classList.remove("active");
}

function updateStepper(step) {
  stepPills.forEach((pill, index) => {
    const pillStep = index + 1;
    pill.classList.remove("active", "done");

    if (pillStep < step) pill.classList.add("done");
    else if (pillStep === step) pill.classList.add("active");
  });
}

function showStep(step) {
  currentStep = step;

  stepPanels.forEach((panel) => {
    panel.classList.remove("active");
    if (Number(panel.dataset.step) === step) panel.classList.add("active");
  });

  if (step === 5) {
    form.classList.add("hidden");
    hideAllEndStates();
    results.classList.remove("hidden");
    results.classList.add("active");
  } else {
    form.classList.remove("hidden");
    hideAllEndStates();
  }

  stepper.classList.remove("hidden");
  updateStepper(step);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showHotCompletion() {
  form.classList.add("hidden");
  results.classList.add("hidden");
  hotCompletionScreen.classList.add("active");
  doneCompletionScreen.classList.remove("active");
  stepper.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showDoneCompletion() {
  form.classList.add("hidden");
  results.classList.add("hidden");
  hotCompletionScreen.classList.remove("active");
  doneCompletionScreen.classList.add("active");
  stepper.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleProjectSelector() {
  const isOpen = projectSelectorShell.classList.toggle("open");
  projectSelectorTrigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

function setupAccordions() {
  const groups = document.querySelectorAll(".accordion-group");
  groups.forEach((group) => {
    const button = group.querySelector(".accordion-button");
    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = group.classList.contains("open");
      groups.forEach((g) => g.classList.remove("open"));
      if (!isOpen) group.classList.add("open");
    });
  });
}

function setSelectedProject(projectKey, displayName) {
  projectType.value = projectKey;
  projectDisplayName.value = displayName;
  selectedProjectLabel.textContent = displayName;
  selectedProjectSubLabel.textContent = "Project selected. Continue when ready.";
  selectedProjectMessageText.textContent = displayName;

  [drywallProjectOption, lightingProjectOption, paintProjectOption].forEach((option) => {
    option.classList.toggle("active", option.dataset.value === projectKey);
  });

  projectSelectorShell.classList.remove("open");
  projectSelectorTrigger.setAttribute("aria-expanded", "false");
  clearValidation(validationStep1);
  updateProjectSpecificUI();
}

function getDrywallContext() {
  return damageLocation.value === "ceiling" ? drywallContextConfig.ceiling : drywallContextConfig.wall;
}

function updateDrywallContextUI() {
  const ctx = getDrywallContext();
  const previousScope = scopeContext.value;
  const previousPaint = paintBlend.value;

  scopeContextLabel.textContent = ctx.scopeLabel;
  paintBlendLabel.textContent = ctx.paintLabel;
  workHeightLabel.textContent = ctx.heightLabel;

  setOptions(scopeContext, ctx.scopeOptions, previousScope);
  setOptions(paintBlend, ctx.paintOptions, previousPaint);
}

function togglePaintBlendField() {
  paintBlendField.classList.toggle("hidden", paintRequired.value !== "yes");
}

function updateLightingPaintScopeOptions() {
  const config = lightingPaintScopeConfig[lightingLocation.value] || lightingPaintScopeConfig.ceiling;
  const previousValue = paintLightingScope.value;
  paintLightingScopeLabel.textContent = config.label;
  setOptions(paintLightingScope, config.options, previousValue);
}

function updateLightingConditionalFields() {
  const isReplace = lightingType.value === "replace";
  const isAdd = lightingType.value === "add";
  const access = accessDifficulty.value;
  const wire = wireRun.value;
  const route = atticAccess.value;
  const repair = repairIncluded.value;
  const wantsPaint = paintAfterRepair.value === "yes";

  lightingSwitchField.classList.toggle("hidden", isReplace);
  lightingWireRunField.classList.toggle("hidden", isReplace);
  lightingAtticAccessField.classList.toggle("hidden", isReplace);

  if (isAdd) {
    atticAccessLabel.textContent = "Is access available from above or below (attic, basement, or crawlspace)?";
  }

  const showReplaceRepair = isReplace && access !== "veryEasy";
  const showAddRepair =
    isAdd &&
    (["medium", "long", "notSure"].includes(wire) ||
      ["no", "notSure"].includes(route) ||
      ["moderate", "difficult", "notSure"].includes(access));

  const showRepair = showReplaceRepair || showAddRepair;
  lightingRepairField.classList.toggle("hidden", !showRepair);

  const showPaintYesNo = showRepair && ["yes", "notSure"].includes(repair);
  lightingPaintYesNoField.classList.toggle("hidden", !showPaintYesNo);

  const showPaintScope = showPaintYesNo && wantsPaint;
  lightingPaintScopeField.classList.toggle("hidden", !showPaintScope);

  updateLightingPaintScopeOptions();
}

function getSelectedPaintScopes() {
  return Array.from(paintScopeCheckboxes).filter((cb) => cb.checked).map((cb) => cb.value);
}

function updatePaintConditionalFields() {
  const scopes = getSelectedPaintScopes();
  const includesWalls = scopes.includes("walls");
  const includesCeiling = scopes.includes("ceiling");

  paintSurfaceConditionField.classList.toggle("hidden", !includesWalls);
  paintCeilingHeightField.classList.toggle("hidden", !includesCeiling);

  if (!includesWalls) paintSurfaceCondition.value = "minimal";
  if (!includesCeiling) paintCeilingHeight.value = "under8";

  const showLead = ["before1980", "before1960", "notSure"].includes(paintYearBuilt.value);
  paintLeadPrepField.classList.toggle("hidden", !showLead);
  if (!showLead) paintLeadPrepMode.value = "standard";
}

function updatePropertyTypeMessage() {
  if (!propertyType || !propertyTypeMessage) return;

  const value = propertyType.value;

  if (value === "house") {
    propertyTypeMessage.textContent =
      "Projects in single-family homes are typically more straightforward, with fewer restrictions and easier access for work.";
    propertyTypeMessage.classList.remove("hidden");
    return;
  }

  if (["condo", "hoa", "commercial"].includes(value)) {
    propertyTypeMessage.textContent =
      "Projects in managed properties often require licensed trades, insurance documentation, coordination with management, and building-specific approvals. This can affect logistics, scheduling, and cost.";
    propertyTypeMessage.classList.remove("hidden");
    return;
  }

  if (value === "multifamily") {
    propertyTypeMessage.textContent =
      "Projects in multi-family properties may involve additional coordination, access considerations, and property-specific requirements depending on the building setup.";
    propertyTypeMessage.classList.remove("hidden");
    return;
  }

  if (value === "notSure") {
    propertyTypeMessage.textContent =
      "Property type can affect access, coordination, paperwork, and pricing. If you are not sure, we will help confirm it during project review.";
    propertyTypeMessage.classList.remove("hidden");
    return;
  }

  propertyTypeMessage.textContent = "";
  propertyTypeMessage.classList.add("hidden");
}

function updateProjectSpecificUI() {
  const type = projectType.value;

  if (type === "lighting_add_replace") {
    basicsSubtitle.textContent = "Tell us about the lighting project so we can build a more accurate estimate.";
    detailsSubtitle.textContent = "A few final details help us refine the lighting estimate more accurately.";

    drywallBasicsSection.classList.add("hidden");
    lightingBasicsSection.classList.remove("hidden");
    paintBasicsSection.classList.add("hidden");

    drywallDetailsSection.classList.add("hidden");
    lightingDetailsSection.classList.remove("hidden");
    paintDetailsSection.classList.add("hidden");

    updateLightingConditionalFields();
  } else if (type === "paint_one_room") {
    basicsSubtitle.textContent = "Tell us about the room painting project so we can build a more accurate estimate.";
    detailsSubtitle.textContent = "A few final details help us refine the painting estimate more accurately.";

    drywallBasicsSection.classList.add("hidden");
    lightingBasicsSection.classList.add("hidden");
    paintBasicsSection.classList.remove("hidden");

    drywallDetailsSection.classList.add("hidden");
    lightingDetailsSection.classList.add("hidden");
    paintDetailsSection.classList.remove("hidden");

    updatePaintConditionalFields();
  } else {
    basicsSubtitle.textContent = "Tell us about the damaged area so we can build a more accurate estimate.";
    detailsSubtitle.textContent = "A few final details help us refine the estimate more accurately.";

    drywallBasicsSection.classList.remove("hidden");
    lightingBasicsSection.classList.add("hidden");
    paintBasicsSection.classList.add("hidden");

    drywallDetailsSection.classList.remove("hidden");
    lightingDetailsSection.classList.add("hidden");
    paintDetailsSection.classList.add("hidden");
  }
}

function classifyZipBand(zipcodeRaw) {
  const zip = String(zipcodeRaw || "").trim().slice(0, 5);

  if (!/^\d{5}$/.test(zip)) {
    return { distanceBand: "unknown", serviceZone: "distant", marketRegion: "unknown", multiplier: PRICING.serviceZoneMultipliers.distant };
  }

  if (zip.startsWith("06")) {
    const firstThree = zip.slice(0, 3);
    const corePrefixes = ["064", "065", "066", "067"];
    const extendedPrefixes = ["068", "069", "063"];

    if (corePrefixes.includes(firstThree)) {
      return { distanceBand: "0-50", serviceZone: "core", marketRegion: "connecticut_local", multiplier: PRICING.serviceZoneMultipliers.core };
    }

    if (extendedPrefixes.includes(firstThree)) {
      return { distanceBand: "50-60", serviceZone: "extended", marketRegion: "connecticut_extended", multiplier: PRICING.serviceZoneMultipliers.extended };
    }

    return { distanceBand: "60-70", serviceZone: "outer", marketRegion: "connecticut_outer", multiplier: PRICING.serviceZoneMultipliers.outer };
  }

  if (zip.startsWith("10") || zip.startsWith("11")) {
    return { distanceBand: "50-60", serviceZone: "extended", marketRegion: "new_york_near", multiplier: PRICING.serviceZoneMultipliers.extended };
  }

  if (zip.startsWith("01") || zip.startsWith("02")) {
    return { distanceBand: "60-70", serviceZone: "outer", marketRegion: "massachusetts_near", multiplier: PRICING.serviceZoneMultipliers.outer };
  }

  return { distanceBand: "70+", serviceZone: "distant", marketRegion: "outside_primary_region", multiplier: PRICING.serviceZoneMultipliers.distant };
}

function classifyJobSize(formData) {
  if (formData.projectType === "lighting_add_replace") {
    const count = parseInt(formData.fixtureCount || "1", 10);
    if (count >= 4) return "large";
    if (count >= 2) return "medium";
    return "small";
  }

  if (formData.projectType === "paint_one_room") {
    const count = formData.paintRoomCount;
    if (count === "5plus" || count === "4") return "large";
    if (count === "3" || count === "2" || formData.paintRoomSize === "large" || formData.paintRoomSize === "open") return "medium";
    return "small";
  }

  if (["large", "xlarge"].includes(formData.damageSize)) return "large";
  if (formData.damageSize === "medium") return "medium";
  return "small";
}

function classifyLead(formData) {
  const zipMeta = classifyZipBand(formData.zipcode);
  const jobSize = classifyJobSize(formData);

  let priority = "low";
  if (zipMeta.serviceZone === "core") priority = "high";
  else if (zipMeta.serviceZone === "extended") priority = jobSize === "small" ? "medium" : "high";
  else if (zipMeta.serviceZone === "outer") priority = jobSize === "large" ? "medium" : "low";
  else priority = jobSize === "large" ? "medium" : "low";

  return { ...zipMeta, jobSize, leadPriority: priority };
}

function calculateDrywallEstimate(formData) {
  const ctx = drywallContextConfig[formData.damageLocation === "ceiling" ? "ceiling" : "wall"];
  const leadMeta = classifyLead(formData);
  const crewHourlyRate = PRICING.labor.general.ratePerPerson * PRICING.labor.general.crewSize;
  const preset = PRICING.drywall[formData.damageSize];

  let minMaterials = preset.materialMin;
  let maxMaterials = preset.materialMax;
  let hours = preset.hours;
  const adjustments = [];
  const internalAdjustments = [];

  adjustments.push(`Selected base: ${preset.label}`);
  internalAdjustments.push(`Service zone: ${leadMeta.serviceZone}`);
  internalAdjustments.push(`Distance band: ${leadMeta.distanceBand}`);
  internalAdjustments.push(`Lead priority: ${leadMeta.leadPriority}`);

  if (formData.damageLocation === "ceiling") {
    const a = PRICING.drywallAdjustments.damageLocation.ceiling;
    hours *= a.hoursMultiplier;
    minMaterials += a.materialMinAdd;
    maxMaterials += a.materialMaxAdd;
    adjustments.push(a.label);
  }

  if (formData.texture === "light") {
    const a = PRICING.drywallAdjustments.texture.light;
    hours *= a.hoursMultiplier;
    minMaterials += a.materialMinAdd;
    maxMaterials += a.materialMaxAdd;
    adjustments.push(a.label);
  }

  if (formData.texture === "heavy") {
    const a = PRICING.drywallAdjustments.texture.heavy;
    hours *= a.hoursMultiplier;
    minMaterials += a.materialMinAdd;
    maxMaterials += a.materialMaxAdd;
    adjustments.push(a.label);
  }

  if (formData.ceilingHeight === "medium") {
    const a = PRICING.drywallAdjustments.workHeight.medium;
    hours *= a.hoursMultiplier;
    adjustments.push(a.label);
  }

  if (formData.ceilingHeight === "high") {
    const a = PRICING.drywallAdjustments.workHeight.high;
    hours *= a.hoursMultiplier;
    minMaterials += a.materialMinAdd;
    maxMaterials += a.materialMaxAdd;
    adjustments.push(a.label);
  }

  if (formData.obstacles === "yes") {
    const a = PRICING.drywallAdjustments.obstacles.yes;
    hours *= a.hoursMultiplier;
    adjustments.push(a.label);
  }

  if (formData.insulation === "yes") {
    const a = PRICING.drywallAdjustments.insulation.yes;
    hours += a.hoursAdd;
    minMaterials += a.materialMinAdd;
    maxMaterials += a.materialMaxAdd;
    adjustments.push(a.label);
  }

  if (formData.paintRequired === "yes") {
    if (formData.paintBlend === "patch-only") {
      const a = PRICING.drywallAdjustments.paint.patchOnly;
      hours += a.hoursAdd;
      minMaterials += a.materialMinAdd;
      maxMaterials += a.materialMaxAdd;
      adjustments.push(a.label);
    }

    if (formData.paintBlend === "full-surface") {
      const a = PRICING.drywallAdjustments.paint.fullSurface;
      hours += a.hoursAdd;
      minMaterials += a.materialMinAdd;
      maxMaterials += a.materialMaxAdd;
      adjustments.push(ctx.summaryMap.fullSurfacePaint);
    }

    if (formData.paintBlend === "connected-surfaces") {
      const a = PRICING.drywallAdjustments.paint.connectedSurfaces;
      hours += a.hoursAdd;
      minMaterials += a.materialMinAdd;
      maxMaterials += a.materialMaxAdd;
      adjustments.push(ctx.summaryMap.connectedSurfacePaint);
    }

    if (formData.paintBlend === "not-sure") {
      const a = PRICING.drywallAdjustments.paint.notSure;
      hours += a.hoursAdd;
      minMaterials += a.materialMinAdd;
      maxMaterials += a.materialMaxAdd;
      adjustments.push(a.label);
    }

    if (formData.paintAvailable === "no") {
      const a = PRICING.drywallAdjustments.paint.noExistingPaint;
      minMaterials += a.materialMinAdd;
      maxMaterials += a.materialMaxAdd;
      adjustments.push(a.label);
    }

    if (formData.paintAvailable === "yes") {
      adjustments.push(PRICING.drywallAdjustments.paint.yesExistingPaint.label);
    }
  }

  if (formData.scopeContext === "standard-surface") {
    const a = PRICING.drywallAdjustments.scopeContext.standardSurface;
    hours += a.hoursAdd;
    minMaterials += a.materialMinAdd;
    maxMaterials += a.materialMaxAdd;
    adjustments.push(ctx.summaryMap.standardSurface);
  }

  if (formData.scopeContext === "large-surface") {
    const a = PRICING.drywallAdjustments.scopeContext.largeSurface;
    hours += a.hoursAdd;
    minMaterials += a.materialMinAdd;
    maxMaterials += a.materialMaxAdd;
    adjustments.push(ctx.summaryMap.largeSurface);
  }

  if (formData.scopeContext === "connected-surfaces") {
    const a = PRICING.drywallAdjustments.scopeContext.connectedSurfaces;
    hours += a.hoursAdd;
    minMaterials += a.materialMinAdd;
    maxMaterials += a.materialMaxAdd;
    adjustments.push(ctx.summaryMap.connectedSurfaces);
  }

  hours = Math.round(hours * 10) / 10;

  let laborMin = hours * crewHourlyRate;
  let laborMax = laborMin * 1.15;
  let totalMin = minMaterials + laborMin;
  let totalMax = maxMaterials + laborMax;

  const zoneMultiplier = leadMeta.multiplier;
  minMaterials *= zoneMultiplier;
  maxMaterials *= zoneMultiplier;
  laborMin *= zoneMultiplier;
  laborMax *= zoneMultiplier;
  totalMin *= zoneMultiplier;
  totalMax *= zoneMultiplier;

  internalAdjustments.push(`Market adjustment applied: x${zoneMultiplier.toFixed(2)}`);

  return {
    hours,
    minMaterials,
    maxMaterials,
    laborMin,
    laborMax,
    totalMin,
    totalMax,
    materialsList: preset.materials,
    adjustments,
    internalAdjustments,
    leadMeta
  };
}

function getFixtureCountMultiplier(count) {
  const n = parseInt(count || "1", 10);
  if (n <= 1) return 1;
  if (n === 2) return 1.9;
  if (n === 3) return 2.75;
  if (n === 4) return 3.6;
  return 4.45;
}

function calculateLightingEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const crewHourlyRate = PRICING.labor.electrical.ratePerPerson * PRICING.labor.electrical.crewSize;
  const preset = formData.lightingType === "replace" ? PRICING.lighting.replace : PRICING.lighting.add;

  let minMaterials = preset.materialMin;
  let maxMaterials = preset.materialMax;
  let hours = preset.hours;
  const adjustments = [];
  const internalAdjustments = [];

  adjustments.push(`Selected base: ${preset.label}`);
  internalAdjustments.push(`Service zone: ${leadMeta.serviceZone}`);
  internalAdjustments.push(`Distance band: ${leadMeta.distanceBand}`);
  internalAdjustments.push(`Lead priority: ${leadMeta.leadPriority}`);

  const locationAdj = PRICING.lighting.adjustments.location[formData.lightingLocation];
  if (locationAdj) {
    hours *= locationAdj.hoursMultiplier;
    minMaterials += locationAdj.materialMinAdd || 0;
    maxMaterials += locationAdj.materialMaxAdd || 0;
    if (locationAdj.label) adjustments.push(locationAdj.label);
  }

  const fixtureTypeAdj = PRICING.lighting.adjustments.fixtureType[formData.fixtureType];
  if (fixtureTypeAdj) {
    hours *= fixtureTypeAdj.hoursMultiplier;
    minMaterials += fixtureTypeAdj.materialMinAdd || 0;
    maxMaterials += fixtureTypeAdj.materialMaxAdd || 0;
    if (fixtureTypeAdj.label) adjustments.push(fixtureTypeAdj.label);
  }

  const accessAdj = PRICING.lighting.adjustments.access[formData.accessDifficulty];
  if (accessAdj) {
    hours *= accessAdj.hoursMultiplier;
    minMaterials += accessAdj.materialMinAdd || 0;
    maxMaterials += accessAdj.materialMaxAdd || 0;
    if (accessAdj.label) adjustments.push(accessAdj.label);
  }

  if (formData.lightingType === "add") {
    const wireAdj = PRICING.lighting.adjustments.wireRun[formData.wireRun];
    if (wireAdj) {
      hours += wireAdj.hoursAdd || 0;
      minMaterials += wireAdj.materialMinAdd || 0;
      maxMaterials += wireAdj.materialMaxAdd || 0;
      if (wireAdj.label) adjustments.push(wireAdj.label);
    }

    const switchAdj = PRICING.lighting.adjustments.switch[formData.newSwitch];
    if (switchAdj) {
      hours += switchAdj.hoursAdd || 0;
      minMaterials += switchAdj.materialMinAdd || 0;
      maxMaterials += switchAdj.materialMaxAdd || 0;
      if (switchAdj.label) adjustments.push(switchAdj.label);
    }

    const shouldUseAccessRoute =
      ["medium", "long", "notSure"].includes(formData.wireRun) ||
      ["moderate", "difficult", "notSure"].includes(formData.accessDifficulty);

    if (shouldUseAccessRoute) {
      const atticAdj = PRICING.lighting.adjustments.atticAccess[formData.atticAccess];
      if (atticAdj) {
        hours *= atticAdj.hoursMultiplier;
        minMaterials += atticAdj.materialMinAdd || 0;
        maxMaterials += atticAdj.materialMaxAdd || 0;
        if (atticAdj.label) adjustments.push(atticAdj.label);
      }
    }
  }

  const shouldApplyRepair =
    (formData.lightingType === "replace" && formData.accessDifficulty !== "veryEasy") ||
    (formData.lightingType === "add" &&
      (["medium", "long", "notSure"].includes(formData.wireRun) ||
        ["no", "notSure"].includes(formData.atticAccess) ||
        ["moderate", "difficult", "notSure"].includes(formData.accessDifficulty)));

  if (shouldApplyRepair && formData.repairIncluded !== "no") {
    const repairAdj = PRICING.lighting.adjustments.repair[formData.repairIncluded];
    if (repairAdj) {
      hours += repairAdj.hoursAdd || 0;
      minMaterials += repairAdj.materialMinAdd || 0;
      maxMaterials += repairAdj.materialMaxAdd || 0;
      if (repairAdj.label) adjustments.push(repairAdj.label);
    }

    if (formData.paintAfterRepair === "yes") {
      const paintScopeAdj = PRICING.lighting.adjustments.paintScope[formData.paintLightingScope];
      if (paintScopeAdj) {
        hours += paintScopeAdj.hoursAdd || 0;
        minMaterials += paintScopeAdj.materialMinAdd || 0;
        maxMaterials += paintScopeAdj.materialMaxAdd || 0;
        if (paintScopeAdj.label) adjustments.push(paintScopeAdj.label);
      }
    }
  }

  const heightAdj = PRICING.lighting.adjustments.height[formData.lightingHeight];
  if (heightAdj) {
    hours *= heightAdj.hoursMultiplier;
    if (heightAdj.label) adjustments.push(heightAdj.label);
  }

  const obstacleAdj = PRICING.lighting.adjustments.obstacles[formData.lightingObstacles];
  if (obstacleAdj) {
    hours *= obstacleAdj.hoursMultiplier;
    if (obstacleAdj.label) adjustments.push(obstacleAdj.label);
  }

  const fixtureSupplyAdj = PRICING.lighting.adjustments.fixtureSupply[formData.fixtureSupplied];
  if (fixtureSupplyAdj) {
    minMaterials += fixtureSupplyAdj.materialMinAdd || 0;
    maxMaterials += fixtureSupplyAdj.materialMaxAdd || 0;
    if (fixtureSupplyAdj.label) adjustments.push(fixtureSupplyAdj.label);
  }

  const countMultiplier = getFixtureCountMultiplier(formData.fixtureCount);
  hours *= countMultiplier;
  minMaterials *= countMultiplier;
  maxMaterials *= countMultiplier;

  if (parseInt(formData.fixtureCount || "1", 10) > 1) {
    adjustments.push(`Quantity adjustment for ${formData.fixtureCount} fixtures`);
  }

  hours = Math.round(hours * 10) / 10;

  let laborMin = hours * crewHourlyRate;
  let laborMax = laborMin * 1.15;
  let totalMin = minMaterials + laborMin;
  let totalMax = maxMaterials + laborMax;

  const zoneMultiplier = leadMeta.multiplier;
  minMaterials *= zoneMultiplier;
  maxMaterials *= zoneMultiplier;
  laborMin *= zoneMultiplier;
  laborMax *= zoneMultiplier;
  totalMin *= zoneMultiplier;
  totalMax *= zoneMultiplier;

  internalAdjustments.push(`Market adjustment applied: x${zoneMultiplier.toFixed(2)}`);

  return {
    hours,
    minMaterials,
    maxMaterials,
    laborMin,
    laborMax,
    totalMin,
    totalMax,
    materialsList: preset.materials,
    adjustments,
    internalAdjustments,
    leadMeta
  };
}

function calculatePaintEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const crewHourlyRate = PRICING.labor.general.ratePerPerson * PRICING.labor.general.crewSize;

  let minMaterials = 0;
  let maxMaterials = 0;
  let hours = 0;
  const adjustments = [];
  const internalAdjustments = [];

  internalAdjustments.push(`Service zone: ${leadMeta.serviceZone}`);
  internalAdjustments.push(`Distance band: ${leadMeta.distanceBand}`);
  internalAdjustments.push(`Lead priority: ${leadMeta.leadPriority}`);

  const scopes = formData.paintScopes.length ? formData.paintScopes : ["walls"];

  scopes.forEach((scope) => {
    const a = PRICING.paint.scopeAdds[scope];
    if (a) {
      hours += a.hours;
      minMaterials += a.matMin;
      maxMaterials += a.matMax;
      if (a.label) adjustments.push(a.label);
    }
  });

  const sizeAdj = PRICING.paint.roomSize[formData.paintRoomSize] || PRICING.paint.roomSize.not_sure;
  hours += sizeAdj.hours;
  minMaterials += sizeAdj.matMin;
  maxMaterials += sizeAdj.matMax;
  adjustments.push(sizeAdj.label);

  const colorAdj = PRICING.paint.colorChange[formData.paintColorChange];
  hours += colorAdj.hours;
  minMaterials += colorAdj.matMin;
  maxMaterials += colorAdj.matMax;
  if (colorAdj.label) adjustments.push(colorAdj.label);

  if (scopes.includes("walls")) {
    const surf = PRICING.paint.surfaceCondition[formData.paintSurfaceCondition];
    hours += surf.hours;
    minMaterials += surf.matMin;
    maxMaterials += surf.matMax;
    if (surf.label) adjustments.push(surf.label);
  }

  if (scopes.includes("ceiling")) {
    const ceil = PRICING.paint.ceilingHeight[formData.paintCeilingHeight];
    hours += ceil.hours;
    minMaterials += ceil.matMin;
    maxMaterials += ceil.matMax;
    if (ceil.label) adjustments.push(ceil.label);
  }

  const finish = PRICING.paint.finishLevel[formData.paintFinishLevel];
  hours += finish.hours;
  minMaterials += finish.matMin;
  maxMaterials += finish.matMax;
  if (finish.label) adjustments.push(finish.label);

  const prop = PRICING.paint.propertyType[formData.paintPropertyType];
  hours += prop.hours;
  minMaterials += prop.matMin;
  maxMaterials += prop.matMax;
  if (prop.label) adjustments.push(prop.label);

  const access = PRICING.paint.accessDifficulty[formData.paintAccessDifficulty];
  hours += access.hours;
  minMaterials += access.matMin;
  maxMaterials += access.matMax;
  if (access.label) adjustments.push(access.label);

  const handling = PRICING.paint.paintHandling[formData.paintHandling];
  hours += handling.hours;
  minMaterials += handling.matMin;
  maxMaterials += handling.matMax;
  if (handling.label) adjustments.push(handling.label);

  const obs = PRICING.paint.obstacles[formData.paintObstacles];
  hours += obs.hours;
  minMaterials += obs.matMin;
  maxMaterials += obs.matMax;
  if (obs.label) adjustments.push(obs.label);

  const year = PRICING.paint.yearBuilt[formData.paintYearBuilt];
  hours += year.hours;
  minMaterials += year.matMin;
  maxMaterials += year.matMax;
  if (year.label) adjustments.push(year.label);

  if (["before1980", "before1960", "notSure"].includes(formData.paintYearBuilt)) {
    const lead = PRICING.paint.leadPrepMode[formData.paintLeadPrepMode || "standard"];
    hours += lead.hours;
    minMaterials += lead.matMin;
    maxMaterials += lead.matMax;
    if (lead.label) adjustments.push(lead.label);
  }

  const countMultiplier = PRICING.paint.roomCountMultiplier[formData.paintRoomCount] || 1;
  hours *= countMultiplier;
  minMaterials *= countMultiplier;
  maxMaterials *= countMultiplier;

  if (formData.paintRoomCount !== "1") {
    adjustments.push(`Quantity adjustment for ${formData.paintRoomCount === "5plus" ? "5+" : formData.paintRoomCount} rooms`);
  }

  hours = Math.round(hours * 10) / 10;

  let laborMin = hours * crewHourlyRate;
  let laborMax = laborMin * 1.15;
  let totalMin = minMaterials + laborMin;
  let totalMax = maxMaterials + laborMax;

  const zoneMultiplier = leadMeta.multiplier;
  minMaterials *= zoneMultiplier;
  maxMaterials *= zoneMultiplier;
  laborMin *= zoneMultiplier;
  laborMax *= zoneMultiplier;
  totalMin *= zoneMultiplier;
  totalMax *= zoneMultiplier;

  internalAdjustments.push(`Market adjustment applied: x${zoneMultiplier.toFixed(2)}`);

  return {
    hours,
    minMaterials,
    maxMaterials,
    laborMin,
    laborMax,
    totalMin,
    totalMax,
    materialsList: PRICING.paint.materials,
    adjustments,
    internalAdjustments,
    leadMeta
  };
}

function getUploadedFiles() {
  if (projectType.value === "lighting_add_replace") return projectFilesLighting.files;
  if (projectType.value === "paint_one_room") return projectFilesPaint.files;
  return projectFiles.files;
}

function getFormData() {
  return {
    projectType: projectType.value,
    projectDisplayName: projectDisplayName.value,

    fullName: document.getElementById("fullName").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    zipcode: document.getElementById("zipcode").value.trim(),
    city: document.getElementById("city").value.trim(),
    ownerStatus: document.getElementById("ownerStatus").value,
    timeline: document.getElementById("timeline").value,
    propertyType: propertyType ? propertyType.value : "house",

    damageLocation: damageLocation.value,
    damageSize: damageSize.value,
    scopeContext: scopeContext.value,
    texture: texture.value,
    paintRequired: paintRequired.value,
    paintBlend: paintBlend.value,
    paintAvailable: paintAvailable.value,
    insulation: insulation.value,
    ceilingHeight: ceilingHeight.value,
    obstacles: obstacles.value,
    notes: notes.value.trim(),

    lightingType: lightingType.value,
    lightingLocation: lightingLocation.value,
    fixtureCount: fixtureCount.value,
    fixtureType: fixtureType.value,
    accessDifficulty: accessDifficulty.value,
    fixtureSupplied: fixtureSupplied.value,
    newSwitch: newSwitch.value,
    wireRun: wireRun.value,
    atticAccess: atticAccess.value,
    repairIncluded: repairIncluded.value,
    paintAfterRepair: paintAfterRepair.value,
    paintLightingScope: paintLightingScope.value,
    lightingHeight: lightingHeight.value,
    lightingObstacles: lightingObstacles.value,
    notesLighting: notesLighting.value.trim(),

    paintScopes: getSelectedPaintScopes(),
    paintRoomSize: paintRoomSize.value,
    paintRoomCount: paintRoomCount.value,
    paintColorChange: paintColorChange.value,
    paintCeilingHeight: paintCeilingHeight.value,
    paintSurfaceCondition: paintSurfaceCondition.value,
    paintFinishLevel: paintFinishLevel.value,
    paintPropertyType: paintPropertyType.value,
    paintAccessDifficulty: paintAccessDifficulty.value,
    paintHandling: paintHandling.value,
    paintObstacles: paintObstacles.value,
    paintYearBuilt: paintYearBuilt.value,
    paintLeadPrepMode: paintLeadPrepMode.value,
    paintNotes: paintNotes.value.trim()
  };
}

async function submitLead(leadType, estimateData) {
  const formData = getFormData();
  const leadMeta = estimateData.leadMeta || classifyLead(formData);
  const payload = new FormData();

  payload.append("lead_type", leadType);
  payload.append("project_template", formData.projectDisplayName);
  payload.append("project_type_key", formData.projectType);
  payload.append("page_name", "Project Cost Estimator");
  payload.append("full_name", formData.fullName);
  payload.append("phone", formData.phone);
  payload.append("email", formData.email);
  payload.append("zip_code", formData.zipcode);
  payload.append("city", formData.city);
  payload.append("relationship_to_property", formData.ownerStatus);
  payload.append("timeline", formData.timeline);
  payload.append("property_type_global", formData.propertyType);

  payload.append("distance_band", leadMeta.distanceBand);
  payload.append("service_zone", leadMeta.serviceZone);
  payload.append("market_region", leadMeta.marketRegion);
  payload.append("job_size", leadMeta.jobSize);
  payload.append("lead_priority", leadMeta.leadPriority);
  payload.append("pricing_multiplier", String(leadMeta.multiplier));

  if (formData.projectType === "lighting_add_replace") {
    payload.append("lighting_type", formData.lightingType);
    payload.append("lighting_location", formData.lightingLocation);
    payload.append("fixture_count", formData.fixtureCount);
    payload.append("fixture_type", formData.fixtureType);
    payload.append("access_difficulty", formData.accessDifficulty);
    payload.append("fixture_supplied", formData.fixtureSupplied);
    payload.append("new_switch", formData.newSwitch);
    payload.append("wire_run", formData.wireRun);
    payload.append("attic_access", formData.atticAccess);
    payload.append("repair_included", formData.repairIncluded);
    payload.append("paint_after_repair", formData.paintAfterRepair);
    payload.append("paint_scope", formData.paintLightingScope);
    payload.append("work_height", formData.lightingHeight);
    payload.append("obstacles", formData.lightingObstacles);
    payload.append("notes", formData.notesLighting);
  } else if (formData.projectType === "paint_one_room") {
    payload.append("paint_scopes", formData.paintScopes.join(", "));
    payload.append("room_size", formData.paintRoomSize);
    payload.append("room_count", formData.paintRoomCount);
    payload.append("color_change", formData.paintColorChange);
    payload.append("ceiling_height", formData.paintCeilingHeight);
    payload.append("surface_condition", formData.paintSurfaceCondition);
    payload.append("finish_level", formData.paintFinishLevel);
    payload.append("property_type", formData.paintPropertyType);
    payload.append("access_difficulty", formData.paintAccessDifficulty);
    payload.append("paint_handling", formData.paintHandling);
    payload.append("obstacles", formData.paintObstacles);
    payload.append("year_built", formData.paintYearBuilt);
    payload.append("lead_prep_mode", formData.paintLeadPrepMode);
    payload.append("notes", formData.paintNotes);
  } else {
    payload.append("damage_location", formData.damageLocation);
    payload.append("damage_size", formData.damageSize);
    payload.append("scope_context", formData.scopeContext);
    payload.append("texture", formData.texture);
    payload.append("paint_required", formData.paintRequired);
    payload.append("paint_area", formData.paintBlend);
    payload.append("paint_available", formData.paintAvailable);
    payload.append("insulation", formData.insulation);
    payload.append("work_height", formData.ceilingHeight);
    payload.append("obstacles", formData.obstacles);
    payload.append("notes", formData.notes);
  }

  payload.append("estimated_materials", `${currency(estimateData.minMaterials)} - ${currency(estimateData.maxMaterials)}`);
  payload.append("estimated_labor", `${currency(estimateData.laborMin)} - ${currency(estimateData.laborMax)}`);
  payload.append("estimated_total_range", `${currency(estimateData.totalMin)} - ${currency(estimateData.totalMax)}`);
  payload.append("estimated_hours", `${estimateData.hours} hours`);
  payload.append("materials_considered", estimateData.materialsList.join(", "));
  payload.append("calculation_summary", [...estimateData.adjustments, ...estimateData.internalAdjustments].join(" | "));
  payload.append("_subject", `${leadType} LEAD - ${formData.projectDisplayName} - ${leadMeta.serviceZone.toUpperCase()} - ${leadMeta.leadPriority.toUpperCase()}`);

  const files = getUploadedFiles();
  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      payload.append("attachments", files[i]);
    }
  }

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    body: payload,
    headers: { Accept: "application/json" }
  });

  if (!response.ok) throw new Error("Submission failed.");
  return response;
}

function validateStep(step) {
  if (step === 1) {
    clearValidation(validationStep1);
    if (!projectType.value) {
      showValidation(validationStep1, "Please select a project type before continuing.");
      return false;
    }
  }

  if (step === 2) {
    clearValidation(validationStep2);
    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const zipcode = document.getElementById("zipcode").value.trim();

    if (!fullName || !phone || !email || !zipcode) {
      showValidation(validationStep2, "Please complete name, phone, email, and ZIP code before continuing.");
      return false;
    }
  }

  if (step === 3) {
    clearValidation(validationStep3);
    if (projectType.value === "paint_one_room" && getSelectedPaintScopes().length === 0) {
      showValidation(validationStep3, "Please select at least one area to paint before continuing.");
      return false;
    }
  }

  if (step === 4) {
    clearValidation(validationStep4);
  }

  return true;
}

function renderEstimate(estimateData, formData) {
  materialsOutput.textContent = `Estimated Materials: ${currency(estimateData.minMaterials)} - ${currency(estimateData.maxMaterials)}`;
  laborOutput.textContent = `Estimated Labor: ${currency(estimateData.laborMin)} - ${currency(estimateData.laborMax)}`;
  totalOutput.textContent = `Estimated Total Range: ${currency(estimateData.totalMin)} - ${currency(estimateData.totalMax)}`;
  resultsProjectName.textContent = `Project Type: ${formData.projectDisplayName}`;

  breakdownList.innerHTML = "";
  const summaryItems = [
    `Estimated crew time: ${estimateData.hours} hours`,
    `Materials considered: ${estimateData.materialsList.join(", ")}`
  ];

  [...summaryItems, ...estimateData.adjustments].forEach((item) => {
    if (!item) return;
    const li = document.createElement("li");
    li.textContent = item;
    breakdownList.appendChild(li);
  });
}

function resetExperience() {
  form.reset();

  clearValidation(validationStep1);
  clearValidation(validationStep2);
  clearValidation(validationStep3);
  clearValidation(validationStep4);

  latestEstimate = null;
  coldLeadSubmitted = false;
  hotLeadSubmitted = false;

  if (hotLeadBtn) {
    hotLeadBtn.disabled = false;
    hotLeadBtn.textContent = "Get My Exact Quote";
  }

  if (doneBtn) {
    doneBtn.disabled = false;
  }

  breakdownList.innerHTML = "";

  setSelectedProject("drywall_patch_wall_repair", "Drywall Patch / Wall Repair");
  updateDrywallContextUI();
  togglePaintBlendField();
  updateLightingConditionalFields();
  updatePaintConditionalFields();
  updatePropertyTypeMessage();
  hideAllEndStates();
  stepper.classList.remove("hidden");
  showStep(1);
}

projectSelectorTrigger.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleProjectSelector();
});

document.addEventListener("click", (e) => {
  if (!projectSelectorShell.contains(e.target)) {
    projectSelectorShell.classList.remove("open");
    projectSelectorTrigger.setAttribute("aria-expanded", "false");
  }
});

drywallProjectOption.addEventListener("click", () => {
  setSelectedProject("drywall_patch_wall_repair", "Drywall Patch / Wall Repair");
});

lightingProjectOption.addEventListener("click", () => {
  setSelectedProject("lighting_add_replace", "Add or Replace a Light Fixture");
});

paintProjectOption.addEventListener("click", () => {
  setSelectedProject("paint_one_room", "Paint One Room");
});

damageLocation.addEventListener("change", updateDrywallContextUI);
paintRequired.addEventListener("change", togglePaintBlendField);

lightingType.addEventListener("change", updateLightingConditionalFields);
lightingLocation.addEventListener("change", updateLightingConditionalFields);
accessDifficulty.addEventListener("change", updateLightingConditionalFields);
wireRun.addEventListener("change", updateLightingConditionalFields);
atticAccess.addEventListener("change", updateLightingConditionalFields);
repairIncluded.addEventListener("change", updateLightingConditionalFields);
paintAfterRepair.addEventListener("change", updateLightingConditionalFields);

paintScopeCheckboxes.forEach((cb) => cb.addEventListener("change", updatePaintConditionalFields));
paintYearBuilt.addEventListener("change", updatePaintConditionalFields);

if (propertyType) {
  propertyType.addEventListener("change", updatePropertyTypeMessage);
}

setupAccordions();

nextToStep2.addEventListener("click", () => {
  if (validateStep(1)) showStep(2);
});

backToStep1.addEventListener("click", () => {
  showStep(1);
});

nextToStep3.addEventListener("click", () => {
  if (validateStep(2)) showStep(3);
});

backToStep2.addEventListener("click", () => {
  showStep(2);
});

nextToStep4.addEventListener("click", () => {
  if (validateStep(3)) showStep(4);
});

backToStep3.addEventListener("click", () => {
  showStep(3);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validateStep(4)) return;

  const formData = getFormData();

  if (formData.projectType === "lighting_add_replace") {
    latestEstimate = calculateLightingEstimate(formData);
  } else if (formData.projectType === "paint_one_room") {
    latestEstimate = calculatePaintEstimate(formData);
  } else {
    latestEstimate = calculateDrywallEstimate(formData);
  }

  renderEstimate(latestEstimate, formData);
  showStep(5);

  if (!coldLeadSubmitted) {
    try {
      await submitLead("COLD", latestEstimate);
      coldLeadSubmitted = true;
    } catch (error) {
      console.error(error);
    }
  }
});

hotLeadBtn.addEventListener("click", async () => {
  if (!latestEstimate) return;

  if (hotLeadSubmitted) {
    showHotCompletion();
    return;
  }

  hotLeadBtn.disabled = true;
  hotLeadBtn.textContent = "Sending...";
  doneBtn.disabled = true;

  try {
    await submitLead("HOT", latestEstimate);
    hotLeadSubmitted = true;
    showHotCompletion();
  } catch (error) {
    console.error(error);
    hotLeadBtn.disabled = false;
    hotLeadBtn.textContent = "Get My Exact Quote";
    doneBtn.disabled = false;
    alert("We could not submit your request right now. Please try again.");
  }
});

doneBtn.addEventListener("click", () => {
  showDoneCompletion();
});

startNewFromHot.addEventListener("click", resetExperience);
startNewFromDone.addEventListener("click", resetExperience);

updateDrywallContextUI();
togglePaintBlendField();
updateLightingConditionalFields();
updatePaintConditionalFields();
updatePropertyTypeMessage();
setSelectedProject("drywall_patch_wall_repair", "Drywall Patch / Wall Repair");
hideAllEndStates();
showStep(1);
