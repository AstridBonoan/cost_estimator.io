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
    reason: {
      label: "What best describes the reason for this project?",
      options: [
        { value: "leak", label: "It is leaking" },
        { value: "notWorking", label: "Not working properly" },
        { value: "replace", label: "Replace / upgrade" },
        { value: "loose", label: "Loose, unstable, or worn" }
      ]
    },
    location: {
      label: "Where is this faucet located?",
      options: [
        { value: "kitchen", label: "Kitchen" },
        { value: "bathroom", label: "Bathroom" },
        { value: "laundry", label: "Laundry" },
        { value: "utility", label: "Utility / Mechanical" },
        { value: "exterior", label: "Exterior" }
      ]
    },
    severity: {
      label: "How would you describe the project right now?",
      options: [
        { value: "simple", label: "Simple replacement only" },
        { value: "damage", label: "There may be surrounding damage" },
        { value: "active", label: "Active issue that may affect other areas" }
      ]
    },
    details: {
      hasFixture: {
        show: true,
        label: "Do you already have the new faucet?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "notSure", label: "Not sure" }
        ]
      },
      shutoff: {
        show: true,
        label: "Are the shutoff valves working properly?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "notSure", label: "Not sure" }
        ]
      },
      visibleDamage: {
        show: true,
        label: "Any visible water damage below or around the fixture?",
        options: [
          { value: "no", label: "No" },
          { value: "minor", label: "Minor" },
          { value: "major", label: "Major" },
          { value: "notSure", label: "Not sure" }
        ]
      },
      access: {
        show: true,
        label: "How easy is access to the work area?",
        options: [
          { value: "easy", label: "Easy" },
          { value: "moderate", label: "Moderate" },
          { value: "difficult", label: "Difficult" },
          { value: "notSure", label: "Not sure" }
        ]
      }
    }
  },

  plumbing_replace_toilet: {
    reason: {
      label: "What best describes the reason for this project?",
      options: [
        { value: "leak", label: "It is leaking" },
        { value: "notWorking", label: "Not working properly" },
        { value: "replace", label: "Replace / upgrade" },
        { value: "loose", label: "Loose, rocking, or unstable" }
      ]
    },
    location: {
      label: "Where is this toilet located?",
      options: [
        { value: "bathroom_main", label: "Bathroom / Main floor" },
        { value: "bathroom_upper", label: "Bathroom / Upper floor" },
        { value: "basement_bath", label: "Basement bathroom" },
        { value: "otherInterior", label: "Other interior location" }
      ]
    },
    severity: {
      label: "How would you describe the project right now?",
      options: [
        { value: "simple", label: "Simple replacement only" },
        { value: "damage", label: "There may be surrounding damage" },
        { value: "active", label: "Active issue that may affect other areas" }
      ]
    },
    details: {
      hasFixture: {
        show: true,
        label: "Do you already have the new toilet?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "notSure", label: "Not sure" }
        ]
      },
      shutoff: {
        show: true,
        label: "Is the toilet shutoff valve working properly?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "notSure", label: "Not sure" }
        ]
      },
      visibleDamage: {
        show: true,
        label: "Any signs of damage around the toilet base or surrounding floor?",
        options: [
          { value: "no", label: "No" },
          { value: "minor", label: "Minor" },
          { value: "major", label: "Major" },
          { value: "notSure", label: "Not sure" }
        ]
      },
      access: {
        show: true,
        label: "How easy is access to the toilet area?",
        options: [
          { value: "easy", label: "Easy" },
          { value: "moderate", label: "Moderate" },
          { value: "difficult", label: "Difficult" },
          { value: "notSure", label: "Not sure" }
        ]
      }
    }
  },

  plumbing_replace_vanity: {
    reason: {
      label: "What best describes the reason for this project?",
      options: [
        { value: "notWorking", label: "Not working properly" },
        { value: "replace", label: "Replace / upgrade" },
        { value: "loose", label: "Loose, damaged, or worn" },
        { value: "damageAround", label: "There may already be damage around it" }
      ]
    },
    location: {
      label: "Where is this vanity located?",
      options: [
        { value: "bathroom", label: "Bathroom" },
        { value: "laundry", label: "Laundry" },
        { value: "kitchen", label: "Kitchen" }
      ]
    },
    severity: {
      label: "How would you describe the project right now?",
      options: [
        { value: "simple", label: "Simple replacement only" },
        { value: "damage", label: "There may be surrounding damage" },
        { value: "active", label: "Related plumbing issue may be affecting other areas" }
      ]
    },
    details: {
      hasFixture: {
        show: true,
        label: "Do you already have the new vanity and faucet?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "notSure", label: "Not sure" }
        ]
      },
      shutoff: {
        show: true,
        label: "Are the shutoff valves working properly?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "notSure", label: "Not sure" }
        ]
      },
      visibleDamage: {
        show: true,
        label: "Any signs of plumbing leaks or water damage inside or behind the vanity?",
        options: [
          { value: "no", label: "No" },
          { value: "minor", label: "Minor" },
          { value: "major", label: "Major" },
          { value: "notSure", label: "Not sure" }
        ]
      },
      access: {
        show: true,
        label: "How easy is access to the work area?",
        options: [
          { value: "easy", label: "Easy" },
          { value: "moderate", label: "Moderate" },
          { value: "difficult", label: "Difficult" },
          { value: "notSure", label: "Not sure" }
        ]
      }
    }
  },

  plumbing_replace_garbage_disposal: {
    reason: {
      label: "What best describes the reason for this project?",
      options: [
        { value: "leak", label: "It is leaking" },
        { value: "notWorking", label: "Not working properly" },
        { value: "replace", label: "Replace / upgrade" }
      ]
    },
    location: {
      label: "Where is this garbage disposal located?",
      options: [
        { value: "kitchen", label: "Kitchen" }
      ]
    },
    severity: {
      label: "How would you describe the project right now?",
      options: [
        { value: "simple", label: "Simple replacement only" },
        { value: "damage", label: "There may be surrounding damage" },
        { value: "active", label: "Active issue that may affect other areas" }
      ]
    },
    details: {
      hasFixture: {
        show: true,
        label: "Do you already have the new garbage disposal?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "notSure", label: "Not sure" }
        ]
      },
      shutoff: {
        show: true,
        label: "Is power already available and usable at the sink area?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "notSure", label: "Not sure" }
        ]
      },
      visibleDamage: {
        show: true,
        label: "Any cabinet damage, moisture, or sink-area damage?",
        options: [
          { value: "no", label: "No" },
          { value: "minor", label: "Minor" },
          { value: "major", label: "Major" },
          { value: "notSure", label: "Not sure" }
        ]
      },
      access: {
        show: true,
        label: "How easy is access under the sink?",
        options: [
          { value: "easy", label: "Easy" },
          { value: "moderate", label: "Moderate" },
          { value: "difficult", label: "Difficult" },
          { value: "notSure", label: "Not sure" }
        ]
      }
    }
  },

  plumbing_replace_shutoff_valves: {
    reason: {
      label: "What best describes the reason for this project?",
      options: [
        { value: "leak", label: "They are leaking" },
        { value: "notWorking", label: "They are not working properly" },
        { value: "replace", label: "Replace / upgrade" },
        { value: "loose", label: "Corroded, worn, or stuck" }
      ]
    },
    location: {
      label: "Where are these shutoff valves located?",
      options: [
        { value: "kitchen", label: "Kitchen" },
        { value: "bathroom", label: "Bathroom" },
        { value: "laundry", label: "Laundry" },
        { value: "utility", label: "Utility / Mechanical" },
        { value: "basement", label: "Basement" },
        { value: "exterior", label: "Exterior" }
      ]
    },
    severity: {
      label: "How would you describe the project right now?",
      options: [
        { value: "simple", label: "Simple replacement only" },
        { value: "damage", label: "There may be surrounding damage" },
        { value: "active", label: "Active issue that may affect other areas" }
      ]
    },
    details: {
      hasFixture: {
        show: true,
        label: "How many shutoff valves are involved?",
        options: [
          { value: "one", label: "One valve" },
          { value: "two", label: "Two valves" },
          { value: "notSure", label: "Not sure" }
        ]
      },
      shutoff: {
        show: false,
        label: "",
        options: []
      },
      visibleDamage: {
        show: true,
        label: "Do the valves appear corroded, stuck, or leaking?",
        options: [
          { value: "no", label: "No" },
          { value: "minor", label: "Some wear / corrosion" },
          { value: "major", label: "Heavy corrosion / active leaking" },
          { value: "notSure", label: "Not sure" }
        ]
      },
      access: {
        show: true,
        label: "Are the valves easy to access?",
        options: [
          { value: "easy", label: "Easy" },
          { value: "moderate", label: "Moderate" },
          { value: "difficult", label: "Difficult" },
          { value: "notSure", label: "Not sure" }
        ]
      }
    }
  },

  plumbing_fix_active_leak: {
    reason: {
      label: "What best describes this plumbing issue?",
      options: [
        { value: "activeNow", label: "The leak is active right now" },
        { value: "intermittent", label: "The leak comes and goes" },
        { value: "damageAround", label: "There are signs of water damage" },
        { value: "notSure", label: "Not sure" }
      ]
    },
    location: {
      label: "Where is this plumbing issue located?",
      options: [
        { value: "bathroom", label: "Bathroom" },
        { value: "kitchen", label: "Kitchen" },
        { value: "laundry", label: "Laundry" },
        { value: "utility", label: "Utility / Mechanical" },
        { value: "basement", label: "Basement" },
        { value: "exterior", label: "Exterior" }
      ]
    },
    severity: {
      label: "How would you describe the issue right now?",
      options: [
        { value: "active", label: "Leak is active right now" },
        { value: "contained", label: "Not actively leaking now, but needs repair" },
        { value: "damage", label: "There may already be damage around it" }
      ]
    },
