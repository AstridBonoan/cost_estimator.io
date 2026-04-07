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
function classifyZipBand(zipcodeRaw) {
  const zip = String(zipcodeRaw || "").trim().slice(0, 5);

  if (!/^\d{5}$/.test(zip)) {
    return {
      distanceBand: "unknown",
      serviceZone: "distant",
      marketRegion: "unknown",
      multiplier: PRICING.serviceZoneMultipliers.distant
    };
  }

  if (zip.startsWith("06")) {
    const firstThree = zip.slice(0, 3);
    const corePrefixes = ["064", "065", "066", "067"];
    const extendedPrefixes = ["068", "069", "063"];

    if (corePrefixes.includes(firstThree)) {
      return {
        distanceBand: "0-50",
        serviceZone: "core",
        marketRegion: "connecticut_local",
        multiplier: PRICING.serviceZoneMultipliers.core
      };
    }

    if (extendedPrefixes.includes(firstThree)) {
      return {
        distanceBand: "50-60",
        serviceZone: "extended",
        marketRegion: "connecticut_extended",
        multiplier: PRICING.serviceZoneMultipliers.extended
      };
    }

    return {
      distanceBand: "60-70",
      serviceZone: "outer",
      marketRegion: "connecticut_outer",
      multiplier: PRICING.serviceZoneMultipliers.outer
    };
  }

  if (zip.startsWith("10") || zip.startsWith("11")) {
    return {
      distanceBand: "50-60",
      serviceZone: "extended",
      marketRegion: "new_york_near",
      multiplier: PRICING.serviceZoneMultipliers.extended
    };
  }

  if (zip.startsWith("01") || zip.startsWith("02")) {
    return {
      distanceBand: "60-70",
      serviceZone: "outer",
      marketRegion: "massachusetts_near",
      multiplier: PRICING.serviceZoneMultipliers.outer
    };
  }

  return {
    distanceBand: "70+",
    serviceZone: "distant",
    marketRegion: "outside_primary_region",
    multiplier: PRICING.serviceZoneMultipliers.distant
  };
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
    if (
      count === "3" ||
      count === "2" ||
      formData.paintRoomSize === "large" ||
      formData.paintRoomSize === "open"
    ) {
      return "medium";
    }
    return "small";
  }

  if (isPlumbingProject(formData.projectType)) {
    if (
      [
        "plumbing_replace_vanity",
        "plumbing_fix_active_leak",
        "plumbing_install_new_fixture"
      ].includes(formData.projectType)
    ) {
      return "medium";
    }
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

  return {
    ...zipMeta,
    jobSize,
    leadPriority: priority
  };
}

function applyMarketAndPropertyAdjustments(baseEstimate, formData, leadMeta) {
  const propertyConfig = PROPERTY_TYPE_CONFIG[formData.propertyType] || PROPERTY_TYPE_CONFIG.house;
  const zoneMultiplier = leadMeta.multiplier;
  const propertyMultiplier = propertyConfig.multiplier;
  const finalMultiplier = zoneMultiplier * propertyMultiplier;

  baseEstimate.minMaterials *= finalMultiplier;
  baseEstimate.maxMaterials *= finalMultiplier;
  baseEstimate.laborMin *= finalMultiplier;
  baseEstimate.laborMax *= finalMultiplier;
  baseEstimate.totalMin *= finalMultiplier;
  baseEstimate.totalMax *= finalMultiplier;

  baseEstimate.internalAdjustments.push(`Market adjustment applied: x${zoneMultiplier.toFixed(2)}`);
  baseEstimate.internalAdjustments.push(`Property type adjustment: x${propertyMultiplier.toFixed(2)}`);

  return baseEstimate;
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

  const laborMin = hours * crewHourlyRate;
  const laborMax = laborMin * 1.15;
  const totalMin = minMaterials + laborMin;
  const totalMax = maxMaterials + laborMax;

  return applyMarketAndPropertyAdjustments(
    {
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
    },
    formData,
    leadMeta
  );
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

  const laborMin = hours * crewHourlyRate;
  const laborMax = laborMin * 1.15;
  const totalMin = minMaterials + laborMin;
  const totalMax = maxMaterials + laborMax;

  return applyMarketAndPropertyAdjustments(
    {
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
    },
    formData,
    leadMeta
  );
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

  const laborMin = hours * crewHourlyRate;
  const laborMax = laborMin * 1.15;
  const totalMin = minMaterials + laborMin;
  const totalMax = maxMaterials + laborMax;

  return applyMarketAndPropertyAdjustments(
    {
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
    },
    formData,
    leadMeta
  );
}

function calculatePlumbingEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const adjustments = [];
  const internalAdjustments = [
    `Service zone: ${leadMeta.serviceZone}`,
    `Distance band: ${leadMeta.distanceBand}`,
    `Lead priority: ${leadMeta.leadPriority}`
  ];

  let hours = 0;
  let minMaterials = 0;
  let maxMaterials = 0;
  let laborMin = 0;
  let laborMax = 0;
  let materialsList = [];

  switch (formData.projectType) {
    case "plumbing_replace_faucet": {
      hours = 2.0;
      laborMin = 250;
      laborMax = 325;
      materialsList = PRICING.plumbing.materials.faucet;
      adjustments.push("Base: faucet replacement");

      if (formData.plumbingFaucetHasFixture === "no") {
        minMaterials += 40;
        maxMaterials += 180;
        adjustments.push("Fixture allowance included");
      }

      if (formData.plumbingFaucetShutoffCondition === "no") {
        laborMin += 60;
        laborMax += 120;
        minMaterials += 25;
        maxMaterials += 50;
        adjustments.push("Shutoff valve issue adjustment");
      }

      if (formData.plumbingFaucetAccessDifficulty === "moderate") {
        laborMin += 25;
        laborMax += 60;
        adjustments.push("Moderate access adjustment");
      }

      if (formData.plumbingFaucetAccessDifficulty === "difficult") {
        laborMin += 60;
        laborMax += 120;
        adjustments.push("Difficult access adjustment");
      }

      if (formData.plumbingFaucetVisibleDamage === "minor") {
        laborMin += 30;
        laborMax += 75;
        adjustments.push("Minor surrounding condition adjustment");
      }

      if (formData.plumbingFaucetVisibleDamage === "major") {
        laborMin += 90;
        laborMax += 180;
        adjustments.push("Major surrounding condition adjustment");
      }

      if (formData.plumbingFaucetSeverity === "active") {
        laborMin += 60;
        laborMax += 120;
        adjustments.push("Active issue adjustment");
      }
      break;
    }

    case "plumbing_replace_toilet": {
      hours = 3.0;
      laborMin = 300;
      laborMax = 380;
      materialsList = PRICING.plumbing.materials.toilet;
      adjustments.push("Base: toilet replacement");

      if (formData.plumbingToiletHasFixture === "no") {
        minMaterials += 120;
        maxMaterials += 250;
        adjustments.push("Toilet allowance included");
      }

      if (formData.plumbingToiletLoose === "yes") {
        laborMin += 40;
        laborMax += 90;
        adjustments.push("Loose / rocking toilet adjustment");
      }

      if (formData.plumbingToiletFloorIssue === "crackedTile") {
        laborMin += 60;
        laborMax += 120;
        adjustments.push("Cracked tile condition noted");
      }

      if (formData.plumbingToiletFloorIssue === "softFloor") {
        laborMin += 120;
        laborMax += 240;
        adjustments.push("Soft floor condition noted");
      }

      if (formData.plumbingToiletFloorIssue === "uneven") {
        laborMin += 60;
        laborMax += 140;
        adjustments.push("Uneven floor condition noted");
      }

      if (formData.plumbingToiletRepairScope === "includeRepairsIfNeeded") {
        laborMin += 60;
        laborMax += 140;
        adjustments.push("Allowance for surrounding repairs if needed");
      }

      if (formData.plumbingToiletAccessDifficulty === "moderate") {
        laborMin += 25;
        laborMax += 60;
        adjustments.push("Moderate access adjustment");
      }

      if (formData.plumbingToiletAccessDifficulty === "difficult") {
        laborMin += 70;
        laborMax += 140;
        adjustments.push("Difficult access adjustment");
      }

      if (formData.plumbingToiletSeverity === "active") {
        laborMin += 50;
        laborMax += 100;
        adjustments.push("Active issue adjustment");
      }
      break;
    }

    case "plumbing_replace_vanity": {
      hours = 4.5;
      laborMin = 400;
      laborMax = 550;
      materialsList = PRICING.plumbing.materials.vanity;
      adjustments.push("Base: vanity replacement");

      if (formData.plumbingVanityHasFixture === "no") {
        minMaterials += 150;
        maxMaterials += 350;
        adjustments.push("Vanity / fixture allowance included");
      }

      if (formData.plumbingVanityIncluded === "vanityTop") {
        laborMin += 40;
        laborMax += 90;
        adjustments.push("Vanity with top adjustment");
      }

      if (formData.plumbingVanityIncluded === "vanityTopFaucet") {
        laborMin += 70;
        laborMax += 140;
        adjustments.push("Vanity with top and faucet adjustment");
      }

      if (formData.plumbingVanitySameSize === "no") {
        laborMin += 80;
        laborMax += 180;
        adjustments.push("Different vanity size adjustment");
      }

      if (formData.plumbingVanityFinishTouchup === "wall") {
        laborMin += 40;
        laborMax += 90;
        adjustments.push("Wall touch-up condition noted");
      }

      if (formData.plumbingVanityFinishTouchup === "tile") {
        laborMin += 70;
        laborMax += 150;
        adjustments.push("Tile touch-up condition noted");
      }

      if (formData.plumbingVanityFinishTouchup === "floor") {
        laborMin += 60;
        laborMax += 140;
        adjustments.push("Floor touch-up condition noted");
      }

      if (formData.plumbingVanityFinishTouchup === "multiple") {
        laborMin += 120;
        laborMax += 240;
        adjustments.push("Multiple finish touch-up areas noted");
      }

      if (formData.plumbingVanityLeakDamage === "minor") {
        laborMin += 60;
        laborMax += 120;
        adjustments.push("Minor leak / water damage condition");
      }

      if (formData.plumbingVanityLeakDamage === "major") {
        laborMin += 140;
        laborMax += 280;
        adjustments.push("Major leak / water damage condition");
      }

      if (formData.plumbingVanityScope === "includeRelatedPlumbing") {
        laborMin += 60;
        laborMax += 140;
        adjustments.push("Allowance for related plumbing components");
      }

      if (formData.plumbingVanitySeverity === "active") {
        laborMin += 50;
        laborMax += 100;
        adjustments.push("Active issue adjustment");
      }
      break;
    }

    case "plumbing_replace_garbage_disposal": {
      hours = 2.5;
      laborMin = 250;
      laborMax = 340;
      materialsList = PRICING.plumbing.materials.garbageDisposal;
      adjustments.push("Base: garbage disposal replacement");

      if (formData.plumbingDisposalHasFixture === "no") {
        minMaterials += 120;
        maxMaterials += 250;
        adjustments.push("Garbage disposal allowance included");
      }

      if (formData.plumbingDisposalAreaDamage === "cabinetDamage") {
        laborMin += 40;
        laborMax += 100;
        adjustments.push("Cabinet damage condition noted");
      }

      if (formData.plumbingDisposalAreaDamage === "waterDamage") {
        laborMin += 50;
        laborMax += 120;
        adjustments.push("Water damage condition noted");
      }

      if (formData.plumbingDisposalAreaDamage === "both") {
        laborMin += 100;
        laborMax += 200;
        adjustments.push("Cabinet and water damage condition noted");
      }

      if (formData.plumbingDisposalPowerReady === "no") {
        laborMin += 80;
        laborMax += 180;
        adjustments.push("Power readiness issue noted");
      }

      if (formData.plumbingDisposalScope === "includeSinkAreaIssuesIfNeeded") {
        laborMin += 60;
        laborMax += 140;
        adjustments.push("Allowance for surrounding sink-area issues");
      }

      if (formData.plumbingDisposalAccessDifficulty === "moderate") {
        laborMin += 25;
        laborMax += 60;
        adjustments.push("Moderate access adjustment");
      }

      if (formData.plumbingDisposalAccessDifficulty === "difficult") {
        laborMin += 60;
        laborMax += 120;
        adjustments.push("Difficult access adjustment");
      }

      if (formData.plumbingDisposalSeverity === "active") {
        laborMin += 40;
        laborMax += 90;
        adjustments.push("Active issue adjustment");
      }
      break;
    }

    case "plumbing_replace_shutoff_valves": {
      hours = 2.0;
      laborMin = 250;
      laborMax = 320;
      minMaterials += 20;
      maxMaterials += 60;
      materialsList = PRICING.plumbing.materials.shutoff;
      adjustments.push("Base: shutoff valve replacement");

      const valveCountMap = {
        "1": 1,
        "2": 1.7,
        "3": 2.35,
        "4plus": 3.1
      };

      const valveMultiplier = valveCountMap[formData.plumbingValveCount] || 1;
      laborMin *= valveMultiplier;
      laborMax *= valveMultiplier;
      minMaterials *= valveMultiplier;
      maxMaterials *= valveMultiplier;
      hours = Math.round((hours * valveMultiplier) * 10) / 10;

      if (formData.plumbingValveCount !== "1") {
        adjustments.push(`Quantity adjustment for ${formData.plumbingValveCount} shutoff valves`);
      }

      if (formData.plumbingValveAccess === "moderate") {
        laborMin += 40;
        laborMax += 80;
        adjustments.push("Moderate access adjustment");
      }

      if (formData.plumbingValveAccess === "difficult") {
        laborMin += 75;
        laborMax += 150;
        adjustments.push("Difficult access adjustment");
      }

      if (["old", "stuck", "seized"].includes(formData.plumbingValveCondition)) {
        laborMin += 35;
        laborMax += 90;
        adjustments.push("Old / stuck valve condition adjustment");
      }

      if (formData.plumbingValvePartOfOtherProject === "yes") {
        adjustments.push("Part of another plumbing project");
      }

      if (formData.plumbingValveScope === "includeNearbyIssuesIfNeeded") {
        laborMin += 50;
        laborMax += 110;
        adjustments.push("Allowance for nearby plumbing issues");
      }

      if (formData.plumbingShutoffSeverity === "active") {
        laborMin += 40;
        laborMax += 90;
        adjustments.push("Active issue adjustment");
      }
      break;
    }

    case "plumbing_fix_active_leak": {
      materialsList = PRICING.plumbing.materials.leak;
      adjustments.push("Base: active leak response");

      if (formData.plumbingLeakAccessDifficulty === "difficult") {
        hours = 5.5;
        laborMin = 500;
        laborMax = 750;
        minMaterials += 40;
        maxMaterials += 120;
        adjustments.push("Behind-wall / difficult-access leak range");
      } else if (formData.plumbingLeakAccessDifficulty === "moderate") {
        hours = 4.25;
        laborMin = 400;
        laborMax = 600;
        minMaterials += 30;
        maxMaterials += 100;
        adjustments.push("Moderate-access leak range");
      } else {
        hours = 3.5;
        laborMin = 350;
        laborMax = 500;
        minMaterials += 20;
        maxMaterials += 80;
        adjustments.push("Accessible leak range");
      }

      if (formData.plumbingLeakDuration === "fewDays") {
        laborMin += 40;
        laborMax += 90;
        adjustments.push("Leak duration adjustment");
      }

      if (formData.plumbingLeakDuration === "weekPlus") {
        laborMin += 90;
        laborMax += 180;
        adjustments.push("Extended leak duration adjustment");
      }

      if (formData.plumbingLeakAffectedSurfaces === "multiple") {
        laborMin += 100;
        laborMax += 220;
        adjustments.push("Multiple affected surfaces noted");
      } else if (
        ["wall", "ceiling", "floor", "cabinet"].includes(formData.plumbingLeakAffectedSurfaces)
      ) {
        laborMin += 40;
        laborMax += 100;
        adjustments.push("Affected surface condition noted");
      }

      if (formData.plumbingLeakDamageSigns === "minor") {
        laborMin += 40;
        laborMax += 100;
        adjustments.push("Minor damage signs noted");
      }

      if (formData.plumbingLeakDamageSigns === "major") {
        laborMin += 120;
        laborMax += 240;
        adjustments.push("Major damage signs noted");
      }

      if (formData.plumbingLeakOpenAccessWork === "yes") {
        laborMin += 80;
        laborMax += 180;
        adjustments.push("Allowance for opening / access work");
      }

      if (formData.plumbingLeakRepairAfterStop === "yes") {
        laborMin += 90;
        laborMax += 200;
        adjustments.push("Allowance for repairs after leak is stopped");
      }
      break;
    }

    case "plumbing_install_new_fixture": {
      hours = 5.0;
      laborMin = 450;
      laborMax = 700;
      materialsList = PRICING.plumbing.materials.newFixture;
      adjustments.push("Base: new plumbing fixture installation");

      if (formData.plumbingNewInstallHasFixture === "no") {
        minMaterials += 60;
        maxMaterials += 220;
        adjustments.push("Fixture allowance included");
      }

      if (formData.plumbingNewInstallSupplyAvailable === "no") {
        laborMin += 120;
        laborMax += 240;
        adjustments.push("New supply line work likely needed");
      }

      if (formData.plumbingNewInstallDrainAvailable === "no") {
        laborMin += 140;
        laborMax += 280;
        adjustments.push("New drain line work likely needed");
      }

      if (formData.plumbingNewInstallOpeningNeeded === "yes") {
        laborMin += 100;
        laborMax += 220;
        adjustments.push("Opening / access work likely needed");
      }

      if (formData.plumbingNewInstallAccessDifficulty === "moderate") {
        laborMin += 80;
        laborMax += 160;
        adjustments.push("Moderate access / routing adjustment");
      }

      if (formData.plumbingNewInstallAccessDifficulty === "difficult") {
        laborMin += 220;
        laborMax += 400;
        adjustments.push("Difficult access / routing adjustment");
      }

      if (formData.plumbingNewInstallRepairScope === "includeFinishRepairsIfNeeded") {
        laborMin += 80;
        laborMax += 180;
        adjustments.push("Allowance for related finish repairs");
      }

      if (formData.plumbingNewInstallCondition === "somePlumbingNeeded") {
        laborMin += 80;
        laborMax += 160;
        adjustments.push("Some added plumbing work indicated");
      }

      if (formData.plumbingNewInstallCondition === "openingLikelyNeeded") {
        laborMin += 140;
        laborMax += 280;
        adjustments.push("Wall / floor opening likely needed");
      }
      break;
    }

    default: {
      hours = 2.0;
      laborMin = 250;
      laborMax = 350;
      materialsList = ["Minor plumbing consumables"];
      adjustments.push("Base plumbing estimate");
    }
  }

  const totalMin = minMaterials + laborMin;
  const totalMax = maxMaterials + laborMax;

  return applyMarketAndPropertyAdjustments(
    {
      hours,
      minMaterials,
      maxMaterials,
      laborMin,
      laborMax,
      totalMin,
      totalMax,
      materialsList,
      adjustments,
      internalAdjustments,
      leadMeta
    },
    formData,
    leadMeta
  );
}

function getUploadedFiles() {
  if (projectType.value === "lighting_add_replace") return projectFilesLighting.files;
  if (projectType.value === "paint_one_room") return projectFilesPaint.files;

  if (projectType.value === "plumbing_replace_faucet") {
    return document.getElementById("projectFilesPlumbingFaucet").files;
  }

  if (projectType.value === "plumbing_replace_toilet") {
    return document.getElementById("projectFilesPlumbingToilet").files;
  }

  if (projectType.value === "plumbing_replace_vanity") {
    return document.getElementById("projectFilesPlumbingVanity").files;
  }

  if (projectType.value === "plumbing_replace_garbage_disposal") {
    return document.getElementById("projectFilesPlumbingDisposal").files;
  }

  if (projectType.value === "plumbing_replace_shutoff_valves") {
    return document.getElementById("projectFilesPlumbingShutoff").files;
  }

  if (projectType.value === "plumbing_fix_active_leak") {
    return document.getElementById("projectFilesPlumbingLeak").files;
  }

  if (projectType.value === "plumbing_install_new_fixture") {
    return document.getElementById("projectFilesPlumbingNewInstall").files;
  }

  return projectFiles.files;
}

function getFormData() {
  return {
    projectType: projectType.value,
    projectDisplayName: projectDisplayName.value,
    propertyType: propertyTypeGlobal.value,

    fullName: document.getElementById("fullName").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    zipcode: document.getElementById("zipcode").value.trim(),
    city: document.getElementById("city").value.trim(),
    ownerStatus: document.getElementById("ownerStatus").value,
    timeline: document.getElementById("timeline").value,

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
    paintNotes: paintNotes.value.trim(),

    plumbingFaucetReason: document.getElementById("plumbingFaucetReason")?.value || "",
    plumbingFaucetLocation: document.getElementById("plumbingFaucetLocation")?.value || "",
    plumbingFaucetSeverity: document.getElementById("plumbingFaucetSeverity")?.value || "",
    plumbingFaucetHasFixture: document.getElementById("plumbingFaucetHasFixture")?.value || "",
    plumbingFaucetShutoffCondition: document.getElementById("plumbingFaucetShutoffCondition")?.value || "",
    plumbingFaucetAccessDifficulty: document.getElementById("plumbingFaucetAccessDifficulty")?.value || "",
    plumbingFaucetVisibleDamage: document.getElementById("plumbingFaucetVisibleDamage")?.value || "",
    notesPlumbingFaucet: document.getElementById("notesPlumbingFaucet")?.value.trim() || "",

    plumbingToiletReason: document.getElementById("plumbingToiletReason")?.value || "",
    plumbingToiletLocation: document.getElementById("plumbingToiletLocation")?.value || "",
    plumbingToiletSeverity: document.getElementById("plumbingToiletSeverity")?.value || "",
    plumbingToiletLoose: document.getElementById("plumbingToiletLoose")?.value || "",
    plumbingToiletFloorIssue: document.getElementById("plumbingToiletFloorIssue")?.value || "",
    plumbingToiletHasFixture: document.getElementById("plumbingToiletHasFixture")?.value || "",
    plumbingToiletRepairScope: document.getElementById("plumbingToiletRepairScope")?.value || "",
    plumbingToiletAccessDifficulty: document.getElementById("plumbingToiletAccessDifficulty")?.value || "",
    notesPlumbingToilet: document.getElementById("notesPlumbingToilet")?.value.trim() || "",

    plumbingVanityReason: document.getElementById("plumbingVanityReason")?.value || "",
    plumbingVanityLocation: document.getElementById("plumbingVanityLocation")?.value || "",
    plumbingVanitySeverity: document.getElementById("plumbingVanitySeverity")?.value || "",
    plumbingVanityIncluded: document.getElementById("plumbingVanityIncluded")?.value || "",
    plumbingVanitySameSize: document.getElementById("plumbingVanitySameSize")?.value || "",
    plumbingVanityHasFixture: document.getElementById("plumbingVanityHasFixture")?.value || "",
    plumbingVanityFinishTouchup: document.getElementById("plumbingVanityFinishTouchup")?.value || "",
    plumbingVanityLeakDamage: document.getElementById("plumbingVanityLeakDamage")?.value || "",
    plumbingVanityScope: document.getElementById("plumbingVanityScope")?.value || "",
    notesPlumbingVanity: document.getElementById("notesPlumbingVanity")?.value.trim() || "",

    plumbingDisposalReason: document.getElementById("plumbingDisposalReason")?.value || "",
    plumbingDisposalLocation: document.getElementById("plumbingDisposalLocation")?.value || "",
    plumbingDisposalSeverity: document.getElementById("plumbingDisposalSeverity")?.value || "",
    plumbingDisposalHasFixture: document.getElementById("plumbingDisposalHasFixture")?.value || "",
    plumbingDisposalAreaDamage: document.getElementById("plumbingDisposalAreaDamage")?.value || "",
    plumbingDisposalPowerReady: document.getElementById("plumbingDisposalPowerReady")?.value || "",
    plumbingDisposalScope: document.getElementById("plumbingDisposalScope")?.value || "",
    plumbingDisposalAccessDifficulty: document.getElementById("plumbingDisposalAccessDifficulty")?.value || "",
    notesPlumbingDisposal: document.getElementById("notesPlumbingDisposal")?.value.trim() || "",

    plumbingShutoffReason: document.getElementById("plumbingShutoffReason")?.value || "",
    plumbingShutoffLocation: document.getElementById("plumbingShutoffLocation")?.value || "",
    plumbingShutoffSeverity: document.getElementById("plumbingShutoffSeverity")?.value || "",
    plumbingValveCount: document.getElementById("plumbingValveCount")?.value || "",
    plumbingValveAccess: document.getElementById("plumbingValveAccess")?.value || "",
    plumbingValveCondition: document.getElementById("plumbingValveCondition")?.value || "",
    plumbingValvePartOfOtherProject: document.getElementById("plumbingValvePartOfOtherProject")?.value || "",
    plumbingValveScope: document.getElementById("plumbingValveScope")?.value || "",
    notesPlumbingShutoff: document.getElementById("notesPlumbingShutoff")?.value.trim() || "",

    plumbingLeakType: document.getElementById("plumbingLeakType")?.value || "",
    plumbingLeakLocation: document.getElementById("plumbingLeakLocation")?.value || "",
    plumbingLeakCondition: document.getElementById("plumbingLeakCondition")?.value || "",
    plumbingLeakDuration: document.getElementById("plumbingLeakDuration")?.value || "",
    plumbingLeakAffectedSurfaces: document.getElementById("plumbingLeakAffectedSurfaces")?.value || "",
    plumbingLeakDamageSigns: document.getElementById("plumbingLeakDamageSigns")?.value || "",
    plumbingLeakOpenAccessWork: document.getElementById("plumbingLeakOpenAccessWork")?.value || "",
    plumbingLeakRepairAfterStop: document.getElementById("plumbingLeakRepairAfterStop")?.value || "",
    plumbingLeakAccessDifficulty: document.getElementById("plumbingLeakAccessDifficulty")?.value || "",
    notesPlumbingLeak: document.getElementById("notesPlumbingLeak")?.value.trim() || "",

    plumbingNewInstallGoal: document.getElementById("plumbingNewInstallGoal")?.value || "",
    plumbingNewInstallLocation: document.getElementById("plumbingNewInstallLocation")?.value || "",
    plumbingNewInstallCondition: document.getElementById("plumbingNewInstallCondition")?.value || "",
    plumbingNewInstallFixtureType: document.getElementById("plumbingNewInstallFixtureType")?.value || "",
    plumbingNewInstallSupplyAvailable: document.getElementById("plumbingNewInstallSupplyAvailable")?.value || "",
    plumbingNewInstallDrainAvailable: document.getElementById("plumbingNewInstallDrainAvailable")?.value || "",
    plumbingNewInstallOpeningNeeded: document.getElementById("plumbingNewInstallOpeningNeeded")?.value || "",
    plumbingNewInstallHasFixture: document.getElementById("plumbingNewInstallHasFixture")?.value || "",
    plumbingNewInstallAccessDifficulty: document.getElementById("plumbingNewInstallAccessDifficulty")?.value || "",
    plumbingNewInstallRepairScope: document.getElementById("plumbingNewInstallRepairScope")?.value || "",
    notesPlumbingNewInstall: document.getElementById("notesPlumbingNewInstall")?.value.trim() || ""
  };
}

async function submitLead(leadType, estimateData) {
  const formData = getFormData();
  const leadMeta = estimateData.leadMeta || classifyLead(formData);
  const payload = new FormData();

  payload.append("lead_type", leadType);
  payload.append("project_template", formData.projectDisplayName);
  payload.append("project_type_key", formData.projectType);
  payload.append("property_type_global", formData.propertyType);
  payload.append("page_name", "Project Cost Estimator");
  payload.append("full_name", formData.fullName);
  payload.append("phone", formData.phone);
  payload.append("email", formData.email);
  payload.append("zip_code", formData.zipcode);
  payload.append("city", formData.city);
  payload.append("relationship_to_property", formData.ownerStatus);
  payload.append("timeline", formData.timeline);

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
  } else if (formData.projectType === "plumbing_replace_faucet") {
    payload.append("reason", formData.plumbingFaucetReason);
    payload.append("location", formData.plumbingFaucetLocation);
    payload.append("severity", formData.plumbingFaucetSeverity);
    payload.append("has_fixture", formData.plumbingFaucetHasFixture);
    payload.append("shutoff_condition", formData.plumbingFaucetShutoffCondition);
    payload.append("access_difficulty", formData.plumbingFaucetAccessDifficulty);
    payload.append("visible_damage", formData.plumbingFaucetVisibleDamage);
    payload.append("notes", formData.notesPlumbingFaucet);
  } else if (formData.projectType === "plumbing_replace_toilet") {
    payload.append("reason", formData.plumbingToiletReason);
    payload.append("location", formData.plumbingToiletLocation);
    payload.append("severity", formData.plumbingToiletSeverity);
    payload.append("loose", formData.plumbingToiletLoose);
    payload.append("floor_issue", formData.plumbingToiletFloorIssue);
    payload.append("has_fixture", formData.plumbingToiletHasFixture);
    payload.append("repair_scope", formData.plumbingToiletRepairScope);
    payload.append("access_difficulty", formData.plumbingToiletAccessDifficulty);
    payload.append("notes", formData.notesPlumbingToilet);
  } else if (formData.projectType === "plumbing_replace_vanity") {
    payload.append("reason", formData.plumbingVanityReason);
    payload.append("location", formData.plumbingVanityLocation);
    payload.append("severity", formData.plumbingVanitySeverity);
    payload.append("included", formData.plumbingVanityIncluded);
    payload.append("same_size", formData.plumbingVanitySameSize);
    payload.append("has_fixture", formData.plumbingVanityHasFixture);
    payload.append("finish_touchup", formData.plumbingVanityFinishTouchup);
    payload.append("leak_damage", formData.plumbingVanityLeakDamage);
    payload.append("scope", formData.plumbingVanityScope);
    payload.append("notes", formData.notesPlumbingVanity);
  } else if (formData.projectType === "plumbing_replace_garbage_disposal") {
    payload.append("reason", formData.plumbingDisposalReason);
    payload.append("location", formData.plumbingDisposalLocation);
    payload.append("severity", formData.plumbingDisposalSeverity);
    payload.append("has_fixture", formData.plumbingDisposalHasFixture);
    payload.append("area_damage", formData.plumbingDisposalAreaDamage);
    payload.append("power_ready", formData.plumbingDisposalPowerReady);
    payload.append("scope", formData.plumbingDisposalScope);
    payload.append("access_difficulty", formData.plumbingDisposalAccessDifficulty);
    payload.append("notes", formData.notesPlumbingDisposal);
  } else if (formData.projectType === "plumbing_replace_shutoff_valves") {
    payload.append("reason", formData.plumbingShutoffReason);
    payload.append("location", formData.plumbingShutoffLocation);
    payload.append("severity", formData.plumbingShutoffSeverity);
    payload.append("valve_count", formData.plumbingValveCount);
    payload.append("valve_access", formData.plumbingValveAccess);
    payload.append("valve_condition", formData.plumbingValveCondition);
    payload.append("part_of_other_project", formData.plumbingValvePartOfOtherProject);
    payload.append("scope", formData.plumbingValveScope);
    payload.append("notes", formData.notesPlumbingShutoff);
  } else if (formData.projectType === "plumbing_fix_active_leak") {
    payload.append("leak_type", formData.plumbingLeakType);
    payload.append("leak_location", formData.plumbingLeakLocation);
    payload.append("leak_condition", formData.plumbingLeakCondition);
    payload.append("duration", formData.plumbingLeakDuration);
    payload.append("affected_surfaces", formData.plumbingLeakAffectedSurfaces);
    payload.append("damage_signs", formData.plumbingLeakDamageSigns);
    payload.append("open_access_work", formData.plumbingLeakOpenAccessWork);
    payload.append("repair_after_stop", formData.plumbingLeakRepairAfterStop);
    payload.append("access_difficulty", formData.plumbingLeakAccessDifficulty);
    payload.append("notes", formData.notesPlumbingLeak);
  } else if (formData.projectType === "plumbing_install_new_fixture") {
    payload.append("goal", formData.plumbingNewInstallGoal);
    payload.append("location", formData.plumbingNewInstallLocation);
    payload.append("condition", formData.plumbingNewInstallCondition);
    payload.append("fixture_type", formData.plumbingNewInstallFixtureType);
    payload.append("supply_available", formData.plumbingNewInstallSupplyAvailable);
    payload.append("drain_available", formData.plumbingNewInstallDrainAvailable);
    payload.append("opening_needed", formData.plumbingNewInstallOpeningNeeded);
    payload.append("has_fixture", formData.plumbingNewInstallHasFixture);
    payload.append("access_difficulty", formData.plumbingNewInstallAccessDifficulty);
    payload.append("repair_scope", formData.plumbingNewInstallRepairScope);
    payload.append("notes", formData.notesPlumbingNewInstall);
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

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validateStep(4)) return;

  const formData = getFormData();

  if (formData.projectType === "lighting_add_replace") {
    latestEstimate = calculateLightingEstimate(formData);
  } else if (formData.projectType === "paint_one_room") {
    latestEstimate = calculatePaintEstimate(formData);
  } else if (isPlumbingProject(formData.projectType)) {
    latestEstimate = calculatePlumbingEstimate(formData);
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
