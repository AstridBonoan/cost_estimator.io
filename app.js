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

  plumbing: {
    materials: {
      faucet: ["Supply lines", "Faucet connectors", "Sealant / plumber's putty", "Minor consumables"],
      toilet: ["Wax ring / seal", "Closet bolts", "Supply line", "Minor consumables"],
      vanity: ["P-trap parts", "Supply lines", "Caulk / sealant", "Minor consumables"],
      garbageDisposal: ["Disposal connection kit", "Discharge fittings", "Electrical connection consumables", "Minor consumables"],
      shutoff: ["Shutoff valve(s)", "Compression fittings", "Minor consumables"],
      leak: ["Repair fittings", "Pipe section / connector materials", "Sealants", "Minor consumables"],
      newFixture: ["Basic fittings", "Connection materials", "Mounting / fastening consumables", "Minor consumables"]
    }
  },

  serviceZoneMultipliers: { core: 1.0, extended: 1.08, outer: 1.15, distant: 1.22 }
};

const PROPERTY_TYPE_CONFIG = {
  house: { multiplier: 1.0, message: "" },
  multifamily: {
    multiplier: 1.05,
    message: "Multi-unit properties may involve coordination between units, tighter access, and additional protection requirements."
  },
  condo: {
    multiplier: 1.08,
    message: "Condo and co-op projects may require building coordination, insurance documentation, elevator access planning, and restricted work rules."
  },
  hoa: {
    multiplier: 1.12,
    message: "HOA or managed buildings often require approvals, scheduling coordination, certificates of insurance, and restricted work hours."
  },
  commercial: {
    multiplier: 1.15,
    message: "Commercial projects may require additional compliance, coordination, safety procedures, and licensed trade documentation."
  },
  notSure: {
    multiplier: 1.08,
    message: "Property-specific requirements will be confirmed during project review."
  }
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

const PLUMBING_TEMPLATE_CONFIG = {
  plumbing_replace_faucet: {
    basicsId: "plumbingBasicsFaucet",
    detailsId: "plumbingDetailsFaucet",
    display: "Replace Faucet"
  },
  plumbing_replace_toilet: {
    basicsId: "plumbingBasicsToilet",
    detailsId: "plumbingDetailsToilet",
    display: "Replace Toilet"
  },
  plumbing_replace_vanity: {
    basicsId: "plumbingBasicsVanity",
    detailsId: "plumbingDetailsVanity",
    display: "Replace Vanity"
  },
  plumbing_replace_garbage_disposal: {
    basicsId: "plumbingBasicsDisposal",
    detailsId: "plumbingDetailsDisposal",
    display: "Replace Garbage Disposal"
  },
  plumbing_replace_shutoff_valves: {
    basicsId: "plumbingBasicsShutoff",
    detailsId: "plumbingDetailsShutoff",
    display: "Replace Shutoff Valves"
  },
  plumbing_fix_active_leak: {
    basicsId: "plumbingBasicsLeak",
    detailsId: "plumbingDetailsLeak",
    display: "Fix Active Leak"
  },
  plumbing_install_new_fixture: {
    basicsId: "plumbingBasicsNewInstall",
    detailsId: "plumbingDetailsNewInstall",
    display: "Install New Plumbing Fixture"
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

const plumbingFaucetProjectOption = document.getElementById("plumbingFaucetProjectOption");
const plumbingToiletProjectOption = document.getElementById("plumbingToiletProjectOption");
const plumbingVanityProjectOption = document.getElementById("plumbingVanityProjectOption");
const plumbingDisposalProjectOption = document.getElementById("plumbingDisposalProjectOption");
const plumbingShutoffProjectOption = document.getElementById("plumbingShutoffProjectOption");
const plumbingLeakProjectOption = document.getElementById("plumbingLeakProjectOption");
const plumbingNewFixtureProjectOption = document.getElementById("plumbingNewFixtureProjectOption");

const validationStep1 = document.getElementById("validationStep1");
const validationStep2 = document.getElementById("validationStep2");
const validationStep3 = document.getElementById("validationStep3");
const validationStep4 = document.getElementById("validationStep4");

const basicsSubtitle = document.getElementById("basicsSubtitle");
const detailsSubtitle = document.getElementById("detailsSubtitle");

const propertyTypeGlobal = document.getElementById("propertyType");
const propertyTypeMessage = document.getElementById("propertyTypeMessage");

const drywallBasicsSection = document.getElementById("drywallBasicsSection");
const lightingBasicsSection = document.getElementById("lightingBasicsSection");
const paintBasicsSection = document.getElementById("paintBasicsSection");
const plumbingBasicsSection = document.getElementById("plumbingBasicsSection");

const drywallDetailsSection = document.getElementById("drywallDetailsSection");
const lightingDetailsSection = document.getElementById("lightingDetailsSection");
const paintDetailsSection = document.getElementById("paintDetailsSection");
const plumbingDetailsSection = document.getElementById("plumbingDetailsSection");

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

const plumbingBasicsFaucet = document.getElementById("plumbingBasicsFaucet");
const plumbingBasicsToilet = document.getElementById("plumbingBasicsToilet");
const plumbingBasicsVanity = document.getElementById("plumbingBasicsVanity");
const plumbingBasicsDisposal = document.getElementById("plumbingBasicsDisposal");
const plumbingBasicsShutoff = document.getElementById("plumbingBasicsShutoff");
const plumbingBasicsLeak = document.getElementById("plumbingBasicsLeak");
const plumbingBasicsNewInstall = document.getElementById("plumbingBasicsNewInstall");

const plumbingDetailsFaucet = document.getElementById("plumbingDetailsFaucet");
const plumbingDetailsToilet = document.getElementById("plumbingDetailsToilet");
const plumbingDetailsVanity = document.getElementById("plumbingDetailsVanity");
const plumbingDetailsDisposal = document.getElementById("plumbingDetailsDisposal");
const plumbingDetailsShutoff = document.getElementById("plumbingDetailsShutoff");
const plumbingDetailsLeak = document.getElementById("plumbingDetailsLeak");
const plumbingDetailsNewInstall = document.getElementById("plumbingDetailsNewInstall");

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

function updatePropertyTypeMessage() {
  const config = PROPERTY_TYPE_CONFIG[propertyTypeGlobal.value] || PROPERTY_TYPE_CONFIG.house;
  if (!config.message) {
    propertyTypeMessage.textContent = "";
    propertyTypeMessage.classList.add("hidden");
    return;
  }
  propertyTypeMessage.textContent = config.message;
  propertyTypeMessage.classList.remove("hidden");
}

function isPlumbingProject(type) {
  return typeof type === "string" && type.startsWith("plumbing_");
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
  return Array.from(paintScopeCheckboxes)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);
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

function hideAllPlumbingBasicsTemplates() {
  [
    plumbingBasicsFaucet,
    plumbingBasicsToilet,
    plumbingBasicsVanity,
    plumbingBasicsDisposal,
    plumbingBasicsShutoff,
    plumbingBasicsLeak,
    plumbingBasicsNewInstall
  ].forEach((el) => {
    if (el) el.classList.add("hidden");
  });
}

function hideAllPlumbingDetailsTemplates() {
  [
    plumbingDetailsFaucet,
    plumbingDetailsToilet,
    plumbingDetailsVanity,
    plumbingDetailsDisposal,
    plumbingDetailsShutoff,
    plumbingDetailsLeak,
    plumbingDetailsNewInstall
  ].forEach((el) => {
    if (el) el.classList.add("hidden");
  });
}

function updatePlumbingTemplateVisibility() {
  hideAllPlumbingBasicsTemplates();
  hideAllPlumbingDetailsTemplates();

  const config = PLUMBING_TEMPLATE_CONFIG[projectType.value];
  if (!config) return;

  const basicsEl = document.getElementById(config.basicsId);
  const detailsEl = document.getElementById(config.detailsId);

  if (basicsEl) basicsEl.classList.remove("hidden");
  if (detailsEl) detailsEl.classList.remove("hidden");
}

function allProjectOptions() {
  return [
    drywallProjectOption,
    lightingProjectOption,
    paintProjectOption,
    plumbingFaucetProjectOption,
    plumbingToiletProjectOption,
    plumbingVanityProjectOption,
    plumbingDisposalProjectOption,
    plumbingShutoffProjectOption,
    plumbingLeakProjectOption,
    plumbingNewFixtureProjectOption
  ].filter(Boolean);
}

function setSelectedProject(projectKey, displayName) {
  projectType.value = projectKey;
  projectDisplayName.value = displayName;
  selectedProjectLabel.textContent = displayName;
  selectedProjectSubLabel.textContent = "Project selected. Continue when ready.";
  selectedProjectMessageText.textContent = displayName;

  allProjectOptions().forEach((option) => {
    option.classList.toggle("active", option.dataset.value === projectKey);
  });

  projectSelectorShell.classList.remove("open");
  projectSelectorTrigger.setAttribute("aria-expanded", "false");
  clearValidation(validationStep1);
  updateProjectSpecificUI();
}

function updateProjectSpecificUI() {
  const type = projectType.value;

  drywallBasicsSection.classList.add("hidden");
  lightingBasicsSection.classList.add("hidden");
  paintBasicsSection.classList.add("hidden");
  plumbingBasicsSection.classList.add("hidden");

  drywallDetailsSection.classList.add("hidden");
  lightingDetailsSection.classList.add("hidden");
  paintDetailsSection.classList.add("hidden");
  plumbingDetailsSection.classList.add("hidden");

  hideAllPlumbingBasicsTemplates();
  hideAllPlumbingDetailsTemplates();

  if (type === "lighting_add_replace") {
    basicsSubtitle.textContent = "Tell us about the lighting project so we can build a more accurate estimate.";
    detailsSubtitle.textContent = "A few final details help us refine the lighting estimate more accurately.";
    lightingBasicsSection.classList.remove("hidden");
    lightingDetailsSection.classList.remove("hidden");
    updateLightingConditionalFields();
    return;
  }

  if (type === "paint_one_room") {
    basicsSubtitle.textContent = "Tell us about the room painting project so we can build a more accurate estimate.";
    detailsSubtitle.textContent = "A few final details help us refine the painting estimate more accurately.";
    paintBasicsSection.classList.remove("hidden");
    paintDetailsSection.classList.remove("hidden");
    updatePaintConditionalFields();
    return;
  }

  if (isPlumbingProject(type)) {
    basicsSubtitle.textContent = "Tell us about the plumbing project so we can build a more accurate estimate.";
    detailsSubtitle.textContent = "A few final details help us refine the plumbing estimate more accurately.";
    plumbingBasicsSection.classList.remove("hidden");
    plumbingDetailsSection.classList.remove("hidden");
    updatePlumbingTemplateVisibility();
    return;
  }

  basicsSubtitle.textContent = "Tell us about the damaged area so we can build a more accurate estimate.";
  detailsSubtitle.textContent = "A few final details help us refine the estimate more accurately.";
  drywallBasicsSection.classList.remove("hidden");
  drywallDetailsSection.classList.remove("hidden");
  updateDrywallContextUI();
  togglePaintBlendField();
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

plumbingFaucetProjectOption.addEventListener("click", () => {
  setSelectedProject("plumbing_replace_faucet", "Replace Faucet");
});

plumbingToiletProjectOption.addEventListener("click", () => {
  setSelectedProject("plumbing_replace_toilet", "Replace Toilet");
});

plumbingVanityProjectOption.addEventListener("click", () => {
  setSelectedProject("plumbing_replace_vanity", "Replace Vanity");
});

plumbingDisposalProjectOption.addEventListener("click", () => {
  setSelectedProject("plumbing_replace_garbage_disposal", "Replace Garbage Disposal");
});

plumbingShutoffProjectOption.addEventListener("click", () => {
  setSelectedProject("plumbing_replace_shutoff_valves", "Replace Shutoff Valves");
});

plumbingLeakProjectOption.addEventListener("click", () => {
  setSelectedProject("plumbing_fix_active_leak", "Fix Active Leak");
});

plumbingNewFixtureProjectOption.addEventListener("click", () => {
  setSelectedProject("plumbing_install_new_fixture", "Install New Plumbing Fixture");
});

propertyTypeGlobal.addEventListener("change", updatePropertyTypeMessage);

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

updateDrywallContextUI();
togglePaintBlendField();
updateLightingConditionalFields();
updatePaintConditionalFields();
updatePropertyTypeMessage();
setSelectedProject("drywall_patch_wall_repair", "Drywall Patch / Wall Repair");
hideAllEndStates();
showStep(1);
