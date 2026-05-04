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

  tvMount: {
    base: {
      standard: { laborMin: 95, laborMax: 120, matMin: 8, matMax: 20, label: "Standard wall mount" },
      fireplace: { laborMin: 130, laborMax: 180, matMin: 10, matMax: 30, label: "Over fireplace installation" },
      corner: { laborMin: 125, laborMax: 165, matMin: 10, matMax: 25, label: "Corner mount" },
      notSure: { laborMin: 115, laborMax: 155, matMin: 10, matMax: 25, label: "Mounting type to be confirmed" }
    },
    tvSize: {
      small: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0, label: 'TV size up to 43"' },
      medium: { laborMin: 15, laborMax: 25, matMin: 0, matMax: 0, label: 'TV size 44" to 64"' },
      large: { laborMin: 35, laborMax: 60, matMin: 0, matMax: 0, label: 'TV size 65" to 84"' },
      xlarge: { laborMin: 60, laborMax: 100, matMin: 0, matMax: 0, label: 'TV size 85"+' }
    },
    wallType: {
      drywall: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0, label: 'Drywall surface' },
      plaster: { laborMin: 20, laborMax: 40, matMin: 5, matMax: 15, label: 'Plaster wall adjustment' },
      brick: { laborMin: 45, laborMax: 80, matMin: 10, matMax: 25, label: 'Brick surface adjustment' },
      tile: { laborMin: 55, laborMax: 90, matMin: 10, matMax: 25, label: 'Tile surface adjustment' },
      stone: { laborMin: 65, laborMax: 110, matMin: 15, matMax: 35, label: 'Stone surface adjustment' },
      notSure: { laborMin: 25, laborMax: 45, matMin: 5, matMax: 15, label: 'Surface to be confirmed' }
    },
    mountProvided: {
      yes: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0, label: 'Mount bracket provided by customer' },
      no: { laborMin: 0, laborMax: 0, matMin: 35, matMax: 120, label: 'Mount bracket allowance included' },
      notSure: { laborMin: 0, laborMax: 0, matMin: 25, matMax: 80, label: 'Mount bracket allowance to be confirmed' }
    },
    existingOutlet: {
      yes: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0, label: 'Outlet already available' },
      nearby: { laborMin: 10, laborMax: 20, matMin: 0, matMax: 0, label: 'Outlet nearby but not centered' },
      no: { laborMin: 20, laborMax: 35, matMin: 0, matMax: 0, label: 'No nearby outlet confirmed' },
      notSure: { laborMin: 10, laborMax: 20, matMin: 0, matMax: 0, label: 'Outlet condition to be confirmed' }
    },
    wireConceal: {
      none: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0, label: 'Simple visible cable setup' },
      cover: { laborMin: 20, laborMax: 40, matMin: 15, matMax: 40, label: 'External cable concealment' },
      inWall: { laborMin: 80, laborMax: 150, matMin: 25, matMax: 70, label: 'In-wall wire concealment' },
      notSure: { laborMin: 35, laborMax: 65, matMin: 10, matMax: 30, label: 'Wire concealment to be confirmed' }
    },
    powerWork: {
      no: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0, label: '' },
      yes: { laborMin: 120, laborMax: 220, matMin: 35, matMax: 95, label: 'Outlet relocation / addition behind TV' },
      notSure: { laborMin: 70, laborMax: 130, matMin: 20, matMax: 60, label: 'Power work to be confirmed' }
    },
    lowVoltage: {
      no: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0, label: '' },
      yes: { laborMin: 45, laborMax: 90, matMin: 10, matMax: 30, label: 'Low-voltage line relocation' },
      notSure: { laborMin: 25, laborMax: 50, matMin: 5, matMax: 15, label: 'Low-voltage work to be confirmed' }
    },
    soundbarInstall: {
      no: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0, label: '' },
      soundbar: { laborMin: 35, laborMax: 60, matMin: 5, matMax: 20, label: 'Soundbar installation' },
      shelf: { laborMin: 30, laborMax: 55, matMin: 5, matMax: 20, label: 'Accessory shelf installation' },
      both: { laborMin: 60, laborMax: 105, matMin: 10, matMax: 35, label: 'Soundbar + shelf installation' }
    },
    wallPatchPaint: {
      no: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0, label: '' },
      patchOnly: { laborMin: 45, laborMax: 90, matMin: 10, matMax: 30, label: 'Wall patching included' },
      patchPaint: { laborMin: 80, laborMax: 150, matMin: 20, matMax: 55, label: 'Wall patching + paint touch-up included' },
      notSure: { laborMin: 45, laborMax: 85, matMin: 10, matMax: 30, label: 'Wall repair scope to be confirmed' }
    },
    mountHeight: {
      standard: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0, label: 'Standard work height' },
      high: { laborMin: 20, laborMax: 40, matMin: 0, matMax: 0, label: 'High work area adjustment' },
      veryHigh: { laborMin: 45, laborMax: 85, matMin: 0, matMax: 0, label: 'Very high / difficult access adjustment' }
    }
  },

  plumbing: {
    faucet: {
      baseLaborMin: 250,
      baseLaborMax: 250,
      hours: 2.0,
      fixtureAllowanceMin: 40,
      fixtureAllowanceMax: 180,
      shutoffAddLaborMin: 60,
      shutoffAddLaborMax: 120,
      shutoffAddMatMin: 25,
      shutoffAddMatMax: 50,
      activeIssueAddLaborMin: 100,
      activeIssueAddLaborMax: 150,
      access: {
        easy: { laborMin: 0, laborMax: 0 },
        moderate: { laborMin: 35, laborMax: 75 },
        difficult: { laborMin: 75, laborMax: 140 },
        notSure: { laborMin: 40, laborMax: 90 }
      },
      materials: ["Supply lines", "Faucet connectors", "Sealant / plumber's putty", "Minor consumables"]
    },

    toilet: {
      baseLaborMin: 250,
      baseLaborMax: 350,
      hours: 3.0,
      fixtureAllowanceMin: 120,
      fixtureAllowanceMax: 250,
      floorIssue: {
        no: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0 },
        crackedTile: { laborMin: 250, laborMax: 450, matMin: 90, matMax: 220 },
        softFloor: { laborMin: 350, laborMax: 650, matMin: 140, matMax: 320 },
        uneven: { laborMin: 120, laborMax: 250, matMin: 30, matMax: 90 },
        notSure: { laborMin: 150, laborMax: 300, matMin: 40, matMax: 120 }
      },
      loose: {
        yes: { laborMin: 50, laborMax: 100 },
        no: { laborMin: 0, laborMax: 0 },
        notSure: { laborMin: 25, laborMax: 60 }
      },
      access: {
        easy: { laborMin: 0, laborMax: 0 },
        moderate: { laborMin: 40, laborMax: 90 },
        difficult: { laborMin: 90, laborMax: 180 },
        notSure: { laborMin: 50, laborMax: 110 }
      },
      materials: ["Wax ring / seal", "Closet bolts", "Supply line", "Minor consumables"]
    },

    vanity: {
      baseLaborMin: 400,
      baseLaborMax: 500,
      hours: 4.5,
      fixtureAllowanceMin: 150,
      fixtureAllowanceMax: 300,
      sameSize: {
        yes: { laborMin: 0, laborMax: 0 },
        no: { laborMin: 120, laborMax: 260 },
        notSure: { laborMin: 80, laborMax: 180 }
      },
      touchup: {
        no: { laborMin: 0, laborMax: 0 },
        wall: { laborMin: 60, laborMax: 140 },
        tile: { laborMin: 180, laborMax: 350 },
        floor: { laborMin: 120, laborMax: 260 },
        multiple: { laborMin: 220, laborMax: 450 },
        notSure: { laborMin: 90, laborMax: 180 }
      },
      leakDamage: {
        no: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0 },
        minor: { laborMin: 75, laborMax: 160, matMin: 20, matMax: 60 },
        major: { laborMin: 180, laborMax: 320, matMin: 60, matMax: 160 },
        notSure: { laborMin: 90, laborMax: 180, matMin: 25, matMax: 80 }
      },
      materials: ["P-trap parts", "Supply lines", "Caulk / sealant", "Minor consumables"]
    },

    garbageDisposal: {
      baseLaborMin: 250,
      baseLaborMax: 325,
      hours: 2.5,
      fixtureAllowanceMin: 120,
      fixtureAllowanceMax: 250,
      areaDamage: {
        no: { laborMin: 0, laborMax: 0 },
        cabinetDamage: { laborMin: 50, laborMax: 110 },
        waterDamage: { laborMin: 75, laborMax: 150 },
        both: { laborMin: 120, laborMax: 220 },
        notSure: { laborMin: 60, laborMax: 130 }
      },
      powerReady: {
        yes: { laborMin: 0, laborMax: 0, matMin: 0, matMax: 0 },
        no: { laborMin: 120, laborMax: 260, matMin: 30, matMax: 90 },
        notSure: { laborMin: 60, laborMax: 140, matMin: 15, matMax: 50 }
      },
      access: {
        easy: { laborMin: 0, laborMax: 0 },
        moderate: { laborMin: 35, laborMax: 80 },
        difficult: { laborMin: 80, laborMax: 160 },
        notSure: { laborMin: 40, laborMax: 90 }
      },
      materials: ["Disposal connection kit", "Discharge fittings", "Electrical connection consumables", "Minor consumables"]
    },

    shutoff: {
      baseOneLaborMin: 250,
      baseOneLaborMax: 250,
      secondValveMultiplier: 0.5,
      extraValveMultiplier: 0.4,
      baseMatMin: 20,
      baseMatMax: 45,
      access: {
        easy: { laborMin: 0, laborMax: 0 },
        moderate: { laborMin: 40, laborMax: 80 },
        difficult: { laborMin: 75, laborMax: 150 }
      },
      condition: {
        normal: { laborMin: 0, laborMax: 0 },
        old: { laborMin: 20, laborMax: 40 },
        stuck: { laborMin: 40, laborMax: 90 },
        seized: { laborMin: 75, laborMax: 160 },
        notSure: { laborMin: 30, laborMax: 70 }
      },
      materials: ["Shutoff valve(s)", "Compression fittings", "Minor consumables"]
    },

    leak: {
      accessibleLaborMin: 350,
      accessibleLaborMax: 500,
      accessibleHours: 3.5,
      behindWallLaborMin: 500,
      behindWallLaborMax: 700,
      behindWallHours: 5.5,
      accessibleMatMin: 20,
      accessibleMatMax: 80,
      behindWallMatMin: 40,
      behindWallMatMax: 120,
      duration: {
        today: { laborMin: 0, laborMax: 0 },
        fewDays: { laborMin: 40, laborMax: 80 },
        weekPlus: { laborMin: 75, laborMax: 150 },
        notSure: { laborMin: 30, laborMax: 70 }
      },
      affectedSurfaces: {
        no: { laborMin: 0, laborMax: 0 },
        wall: { laborMin: 60, laborMax: 140 },
        ceiling: { laborMin: 80, laborMax: 180 },
        floor: { laborMin: 80, laborMax: 180 },
        cabinet: { laborMin: 60, laborMax: 140 },
        multiple: { laborMin: 140, laborMax: 300 },
        notSure: { laborMin: 60, laborMax: 130 }
      },
      damageSigns: {
        no: { laborMin: 0, laborMax: 0 },
        minor: { laborMin: 40, laborMax: 100 },
        major: { laborMin: 100, laborMax: 220 },
        notSure: { laborMin: 50, laborMax: 120 }
      },
      openAccessWork: {
        yes: { laborMin: 120, laborMax: 260 },
        no: { laborMin: 0, laborMax: 0 },
        notSure: { laborMin: 70, laborMax: 160 }
      },
      repairAfterStop: {
        yes: { laborMin: 100, laborMax: 220 },
        no: { laborMin: 0, laborMax: 0 },
        notSure: { laborMin: 60, laborMax: 140 }
      },
      access: {
        easy: { type: "accessible" },
        moderate: { type: "accessible", laborMin: 40, laborMax: 90 },
        difficult: { type: "behindWall" },
        notSure: { type: "behindWall", laborMin: 0, laborMax: 0 }
      },
      materials: ["Repair fittings", "Pipe section / connector materials", "Sealants", "Minor consumables"]
    },

    newFixture: {
      baseLaborMin: 450,
      baseLaborMax: 700,
      hours: 5.0,
      fixtureAllowanceMin: 60,
      fixtureAllowanceMax: 180,
      supplyAvailable: {
        yes: { laborMin: 0, laborMax: 0 },
        no: { laborMin: 120, laborMax: 260 },
        notSure: { laborMin: 60, laborMax: 140 }
      },
      drainAvailable: {
        yes: { laborMin: 0, laborMax: 0 },
        no: { laborMin: 140, laborMax: 320 },
        notSure: { laborMin: 70, laborMax: 160 }
      },
      openingNeeded: {
        yes: { laborMin: 120, laborMax: 260 },
        no: { laborMin: 0, laborMax: 0 },
        notSure: { laborMin: 70, laborMax: 160 }
      },
      access: {
        easy: { laborMin: 0, laborMax: 0 },
        moderate: { laborMin: 100, laborMax: 180 },
        difficult: { laborMin: 220, laborMax: 400 },
        notSure: { laborMin: 120, laborMax: 220 }
      },
      repairScope: {
        installOnly: { laborMin: 0, laborMax: 0 },
        includeFinishRepairsIfNeeded: { laborMin: 60, laborMax: 140 }
      },
      materials: ["Basic fittings", "Connection materials", "Mounting / fastening consumables", "Minor consumables"]
    }
  },

  serviceZoneMultipliers: { core: 1.0, extended: 1.08, outer: 1.15, distant: 1.22 }
};

const PROPERTY_TYPE_CONFIG = {
  house: { multiplier: 1.0, message: "" },
  multifamily: {
    multiplier: 1.05,
    message: "Multi-unit properties may involve coordination between units, tighter access, and additional protection requirements. Understanding where your project is located helps us account for access, requirements, and overall project conditions."
  },
  condo: {
    multiplier: 1.08,
    message: "Condo and co-op projects may require building coordination, insurance documentation, elevator access planning, and restricted work rules. Understanding where your project is located helps us account for access, requirements, and overall project conditions."
  },
  hoa: {
    multiplier: 1.12,
    message: "HOA or managed buildings often require approvals, scheduling coordination, certificates of insurance, and restricted work hours. Understanding where your project is located helps us account for access, requirements, and overall project conditions."
  },
  commercial: {
    multiplier: 1.15,
    message: "Commercial projects may require additional compliance, coordination, safety procedures, and licensed trade documentation. Understanding where your project is located helps us account for access, requirements, and overall project conditions."
  },
  notSure: {
    multiplier: 1.08,
    message: "Property-specific requirements will be confirmed during project review. Understanding where your project is located helps us account for access, requirements, and overall project conditions."
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
const workingPriceOutput = document.getElementById("workingPriceOutput");
const breakdownList = document.getElementById("breakdownList");
const resultsProjectName = document.getElementById("resultsProjectName");

const hotLeadBtn = document.getElementById("hotLeadBtn");
const doneBtn = document.getElementById("doneBtn");
const payNowBtn = document.getElementById("payNowBtn");
const submitPaymentBtn = document.getElementById("submitPaymentBtn");
const cancelPaymentBtn = document.getElementById("cancelPaymentBtn");
const paymentSection = document.getElementById("paymentSection");
const hotCompletionScreen = document.getElementById("hotCompletionScreen");
const doneCompletionScreen = document.getElementById("doneCompletionScreen");
const startNewFromHot = document.getElementById("startNewFromHot");
const startNewFromDone = document.getElementById("startNewFromDone");

const projectType = document.getElementById("projectType");
const projectDisplayName = document.getElementById("projectDisplayName");
const selectedProjectLabel = document.getElementById("selectedProjectLabel");
const selectedProjectSubLabel = document.getElementById("selectedProjectSubLabel");
const selectedProjectMessageText = document.getElementById("selectedProjectMessageText");
const selectedProjectMessage = document.getElementById("selectedProjectMessage");
const projectSelectorShell = document.getElementById("projectSelectorShell");
const projectSelectorTrigger = document.getElementById("projectSelectorTrigger");

const drywallProjectOption = document.getElementById("drywallProjectOption");
const lightingProjectOption = document.getElementById("lightingProjectOption");
const paintProjectOption = document.getElementById("paintProjectOption");
const tvMountProjectOption = document.getElementById("tvMountProjectOption");
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
const tvMountBasicsSection = document.getElementById("tvMountBasicsSection");
const paintBasicsSection = document.getElementById("paintBasicsSection");
const plumbingBasicsSection = document.getElementById("plumbingBasicsSection");

const drywallDetailsSection = document.getElementById("drywallDetailsSection");
const lightingDetailsSection = document.getElementById("lightingDetailsSection");
const tvMountDetailsSection = document.getElementById("tvMountDetailsSection");
const paintDetailsSection = document.getElementById("paintDetailsSection");
const plumbingDetailsSection = document.getElementById("plumbingDetailsSection");

const damageLocation = document.getElementById("damageLocation");
const damageSize = document.getElementById("damageSize");
const scopeContext = document.getElementById("scopeContext");
const texture = document.getElementById("texture");
const paintRequired = document.getElementById("paintRequired");
const paintAvailable = document.getElementById("paintAvailable");
const insulation = document.getElementById("insulation");
const ceilingHeight = { value: "standard" };
const obstacles = document.getElementById("obstacles");
const notes = document.getElementById("notes");
const projectFiles = document.getElementById("projectFiles");

const scopeContextLabel = document.getElementById("scopeContextLabel");
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

const mountType = document.getElementById("mountType");
const wallType = document.getElementById("wallType");
const tvSize = document.getElementById("tvSize");
const mountProvided = document.getElementById("mountProvided");
const existingOutlet = document.getElementById("existingOutlet");
const wireConceal = document.getElementById("wireConceal");
const powerWork = document.getElementById("powerWork");
const lowVoltage = document.getElementById("lowVoltage");
const soundbarInstall = document.getElementById("soundbarInstall");
const wallPatchPaint = document.getElementById("wallPatchPaint");
const mountHeight = document.getElementById("mountHeight");
const notesTvMount = document.getElementById("notesTvMount");

const powerWorkWrap = document.getElementById("powerWorkWrap");
const lowVoltageWrap = document.getElementById("lowVoltageWrap");

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

// Plumbing basics
const plumbingBasicsFaucet = document.getElementById("plumbingBasicsFaucet");
const plumbingBasicsToilet = document.getElementById("plumbingBasicsToilet");
const plumbingBasicsVanity = document.getElementById("plumbingBasicsVanity");
const plumbingBasicsDisposal = document.getElementById("plumbingBasicsDisposal");
const plumbingBasicsShutoff = document.getElementById("plumbingBasicsShutoff");
const plumbingBasicsLeak = document.getElementById("plumbingBasicsLeak");
const plumbingBasicsNewInstall = document.getElementById("plumbingBasicsNewInstall");

const plumbingFaucetReason = document.getElementById("plumbingFaucetReason");
const plumbingFaucetLocation = document.getElementById("plumbingFaucetLocation");
const plumbingFaucetSeverity = document.getElementById("plumbingFaucetSeverity");

const plumbingToiletReason = document.getElementById("plumbingToiletReason");
const plumbingToiletLocation = document.getElementById("plumbingToiletLocation");
const plumbingToiletSeverity = document.getElementById("plumbingToiletSeverity");

const plumbingVanityReason = document.getElementById("plumbingVanityReason");
const plumbingVanityLocation = document.getElementById("plumbingVanityLocation");
const plumbingVanitySeverity = document.getElementById("plumbingVanitySeverity");

const plumbingDisposalReason = document.getElementById("plumbingDisposalReason");
const plumbingDisposalLocation = document.getElementById("plumbingDisposalLocation");
const plumbingDisposalSeverity = document.getElementById("plumbingDisposalSeverity");

const plumbingShutoffReason = document.getElementById("plumbingShutoffReason");
const plumbingShutoffLocation = document.getElementById("plumbingShutoffLocation");
const plumbingShutoffSeverity = document.getElementById("plumbingShutoffSeverity");

const plumbingLeakType = document.getElementById("plumbingLeakType");
const plumbingLeakLocation = document.getElementById("plumbingLeakLocation");
const plumbingLeakCondition = document.getElementById("plumbingLeakCondition");

const plumbingNewInstallGoal = document.getElementById("plumbingNewInstallGoal");
const plumbingNewInstallLocation = document.getElementById("plumbingNewInstallLocation");
const plumbingNewInstallCondition = document.getElementById("plumbingNewInstallCondition");

// Plumbing details
const plumbingDetailsFaucet = document.getElementById("plumbingDetailsFaucet");
const plumbingDetailsToilet = document.getElementById("plumbingDetailsToilet");
const plumbingDetailsVanity = document.getElementById("plumbingDetailsVanity");
const plumbingDetailsDisposal = document.getElementById("plumbingDetailsDisposal");
const plumbingDetailsShutoff = document.getElementById("plumbingDetailsShutoff");
const plumbingDetailsLeak = document.getElementById("plumbingDetailsLeak");
const plumbingDetailsNewInstall = document.getElementById("plumbingDetailsNewInstall");

const plumbingFaucetHasFixture = document.getElementById("plumbingFaucetHasFixture");
const plumbingFaucetShutoffCondition = document.getElementById("plumbingFaucetShutoffCondition");
const plumbingFaucetAccessDifficulty = document.getElementById("plumbingFaucetAccessDifficulty");
const plumbingFaucetVisibleDamage = document.getElementById("plumbingFaucetVisibleDamage");
const projectFilesPlumbingFaucet = document.getElementById("projectFilesPlumbingFaucet");
const notesPlumbingFaucet = document.getElementById("notesPlumbingFaucet");

const plumbingToiletLoose = document.getElementById("plumbingToiletLoose");
const plumbingToiletFloorIssue = document.getElementById("plumbingToiletFloorIssue");
const plumbingToiletHasFixture = document.getElementById("plumbingToiletHasFixture");
const plumbingToiletRepairScope = document.getElementById("plumbingToiletRepairScope");
const plumbingToiletAccessDifficulty = document.getElementById("plumbingToiletAccessDifficulty");
const projectFilesPlumbingToilet = document.getElementById("projectFilesPlumbingToilet");
const notesPlumbingToilet = document.getElementById("notesPlumbingToilet");

const plumbingVanityIncluded = document.getElementById("plumbingVanityIncluded");
const plumbingVanitySameSize = document.getElementById("plumbingVanitySameSize");
const plumbingVanityHasFixture = document.getElementById("plumbingVanityHasFixture");
const plumbingVanityFinishTouchup = document.getElementById("plumbingVanityFinishTouchup");
const plumbingVanityLeakDamage = document.getElementById("plumbingVanityLeakDamage");
const plumbingVanityScope = document.getElementById("plumbingVanityScope");
const projectFilesPlumbingVanity = document.getElementById("projectFilesPlumbingVanity");
const notesPlumbingVanity = document.getElementById("notesPlumbingVanity");

const plumbingDisposalHasFixture = document.getElementById("plumbingDisposalHasFixture");
const plumbingDisposalAreaDamage = document.getElementById("plumbingDisposalAreaDamage");
const plumbingDisposalPowerReady = document.getElementById("plumbingDisposalPowerReady");
const plumbingDisposalScope = document.getElementById("plumbingDisposalScope");
const plumbingDisposalAccessDifficulty = document.getElementById("plumbingDisposalAccessDifficulty");
const projectFilesPlumbingDisposal = document.getElementById("projectFilesPlumbingDisposal");
const notesPlumbingDisposal = document.getElementById("notesPlumbingDisposal");

const plumbingValveCount = document.getElementById("plumbingValveCount");
const plumbingValveAccess = document.getElementById("plumbingValveAccess");
const plumbingValveCondition = document.getElementById("plumbingValveCondition");
const plumbingValvePartOfOtherProject = document.getElementById("plumbingValvePartOfOtherProject");
const plumbingValveScope = document.getElementById("plumbingValveScope");
const projectFilesPlumbingShutoff = document.getElementById("projectFilesPlumbingShutoff");
const notesPlumbingShutoff = document.getElementById("notesPlumbingShutoff");

const plumbingLeakDuration = document.getElementById("plumbingLeakDuration");
const plumbingLeakAffectedSurfaces = document.getElementById("plumbingLeakAffectedSurfaces");
const plumbingLeakDamageSigns = document.getElementById("plumbingLeakDamageSigns");
const plumbingLeakOpenAccessWork = document.getElementById("plumbingLeakOpenAccessWork");
const plumbingLeakRepairAfterStop = document.getElementById("plumbingLeakRepairAfterStop");
const plumbingLeakAccessDifficulty = document.getElementById("plumbingLeakAccessDifficulty");
const projectFilesPlumbingLeak = document.getElementById("projectFilesPlumbingLeak");
const notesPlumbingLeak = document.getElementById("notesPlumbingLeak");

const plumbingNewInstallFixtureType = document.getElementById("plumbingNewInstallFixtureType");
const plumbingNewInstallSupplyAvailable = document.getElementById("plumbingNewInstallSupplyAvailable");
const plumbingNewInstallDrainAvailable = document.getElementById("plumbingNewInstallDrainAvailable");
const plumbingNewInstallOpeningNeeded = document.getElementById("plumbingNewInstallOpeningNeeded");
const plumbingNewInstallHasFixture = document.getElementById("plumbingNewInstallHasFixture");
const plumbingNewInstallAccessDifficulty = document.getElementById("plumbingNewInstallAccessDifficulty");
const plumbingNewInstallRepairScope = document.getElementById("plumbingNewInstallRepairScope");
const projectFilesPlumbingNewInstall = document.getElementById("projectFilesPlumbingNewInstall");
const notesPlumbingNewInstall = document.getElementById("notesPlumbingNewInstall");

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

function allProjectOptions() {
  return [
    drywallProjectOption,
    lightingProjectOption,
    paintProjectOption,
    tvMountProjectOption,
    plumbingFaucetProjectOption,
    plumbingToiletProjectOption,
    plumbingVanityProjectOption,
    plumbingDisposalProjectOption,
    plumbingShutoffProjectOption,
    plumbingLeakProjectOption,
    plumbingNewFixtureProjectOption
  ].filter(Boolean);
}

function isPlumbingProject(type) {
  return type && type.startsWith("plumbing_");
}

function hideAllPlumbingSubsections() {
  [
    plumbingBasicsFaucet,
    plumbingBasicsToilet,
    plumbingBasicsVanity,
    plumbingBasicsDisposal,
    plumbingBasicsShutoff,
    plumbingBasicsLeak,
    plumbingBasicsNewInstall,
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

function showPlumbingSectionsByProject(type) {
  hideAllPlumbingSubsections();

  if (type === "plumbing_replace_faucet") {
    plumbingBasicsFaucet.classList.remove("hidden");
    plumbingDetailsFaucet.classList.remove("hidden");
  } else if (type === "plumbing_replace_toilet") {
    plumbingBasicsToilet.classList.remove("hidden");
    plumbingDetailsToilet.classList.remove("hidden");
  } else if (type === "plumbing_replace_vanity") {
    plumbingBasicsVanity.classList.remove("hidden");
    plumbingDetailsVanity.classList.remove("hidden");
  } else if (type === "plumbing_replace_garbage_disposal") {
    plumbingBasicsDisposal.classList.remove("hidden");
    plumbingDetailsDisposal.classList.remove("hidden");
  } else if (type === "plumbing_replace_shutoff_valves") {
    plumbingBasicsShutoff.classList.remove("hidden");
    plumbingDetailsShutoff.classList.remove("hidden");
  } else if (type === "plumbing_fix_active_leak") {
    plumbingBasicsLeak.classList.remove("hidden");
    plumbingDetailsLeak.classList.remove("hidden");
  } else if (type === "plumbing_install_new_fixture") {
    plumbingBasicsNewInstall.classList.remove("hidden");
    plumbingDetailsNewInstall.classList.remove("hidden");
  }
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

  if (selectedProjectMessage) {
    selectedProjectMessage.classList.remove("hidden");
    selectedProjectMessage.classList.add("show");
  }

  updateProjectSpecificUI();
}

function getDrywallContext() {
  return damageLocation.value === "ceiling" ? drywallContextConfig.ceiling : drywallContextConfig.wall;
}

function updateDrywallContextUI() {
  const ctx = getDrywallContext();
  const previousScope = scopeContext.value;
  scopeContextLabel.textContent = ctx.scopeLabel;
  setOptions(scopeContext, ctx.scopeOptions, previousScope);
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

function updateTvMountConditionalFields() {
  const wantsPowerWork = wireConceal.value === "inWall" || wireConceal.value === "notSure";
  powerWorkWrap.classList.toggle("hidden", !wantsPowerWork);

  const needsLowVoltage =
    !lowVoltageWrap ||
    (!powerWorkWrap.classList.contains("hidden") && (powerWork.value === "yes" || powerWork.value === "notSure")) ||
    wireConceal.value === "notSure";

  lowVoltageWrap.classList.toggle("hidden", !needsLowVoltage);

  if (powerWorkWrap.classList.contains("hidden")) {
    powerWork.value = "no";
  }
  if (lowVoltageWrap.classList.contains("hidden")) {
    lowVoltage.value = "no";
  }
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

function updateProjectSpecificUI() {
  const type = projectType.value;

  drywallBasicsSection.classList.add("hidden");
  lightingBasicsSection.classList.add("hidden");
  tvMountBasicsSection.classList.add("hidden");
  paintBasicsSection.classList.add("hidden");
  plumbingBasicsSection.classList.add("hidden");

  drywallDetailsSection.classList.add("hidden");
  lightingDetailsSection.classList.add("hidden");
  tvMountDetailsSection.classList.add("hidden");
  paintDetailsSection.classList.add("hidden");
  plumbingDetailsSection.classList.add("hidden");

  hideAllPlumbingSubsections();

  if (!type) {
    basicsSubtitle.textContent = "Tell us about your project so we can build a more accurate estimate.";
    detailsSubtitle.textContent = "Select a project type above to reveal relevant estimate fields.";
    return;
  }

  if (type === "lighting_add_replace") {
    basicsSubtitle.textContent = "Tell us about the lighting project so we can build a more accurate estimate.";
    detailsSubtitle.textContent = "A few final details help us refine the lighting estimate more accurately.";
    lightingBasicsSection.classList.remove("hidden");
    lightingDetailsSection.classList.remove("hidden");
    updateLightingConditionalFields();
    return;
  }

  if (type === "tv_mount_install") {
    basicsSubtitle.textContent = "Tell us about the TV mount project so we can build a more accurate estimate.";
    detailsSubtitle.textContent = "A few final details help us refine the TV mount estimate more accurately.";
    tvMountBasicsSection.classList.remove("hidden");
    tvMountDetailsSection.classList.remove("hidden");
    updateTvMountConditionalFields();
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
    showPlumbingSectionsByProject(type);
    return;
  }

  basicsSubtitle.textContent = "Tell us about the damaged area so we can build a more accurate estimate.";
  detailsSubtitle.textContent = "A few final details help us refine the estimate more accurately.";
  drywallBasicsSection.classList.remove("hidden");
  drywallDetailsSection.classList.remove("hidden");
}
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

  if (formData.projectType === "tv_mount_install") {
    if (formData.tvSize === "xlarge") return "large";
    if (formData.tvSize === "large") return "medium";
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

  return { ...zipMeta, jobSize, leadPriority: priority };
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

function calculateTvMountEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const estimate = {
    laborMin: 0,
    laborMax: 0,
    matMin: 0,
    matMax: 0,
    breakdown: []
  };

  function addLine(item, label) {
    if (!item) return;
    estimate.laborMin += item.laborMin || 0;
    estimate.laborMax += item.laborMax || 0;
    estimate.matMin += item.matMin || 0;
    estimate.matMax += item.matMax || 0;
    if (label) estimate.breakdown.push(label);
  }

  addLine(PRICING.tvMount.base[formData.mountType], `Base installation selected: ${PRICING.tvMount.base[formData.mountType]?.label || "Standard wall mount"}`);
  addLine(PRICING.tvMount.wallType[formData.wallType], PRICING.tvMount.wallType[formData.wallType]?.label);
  addLine(PRICING.tvMount.tvSize[formData.tvSize], PRICING.tvMount.tvSize[formData.tvSize]?.label);
  addLine(PRICING.tvMount.mountProvided[formData.mountProvided], PRICING.tvMount.mountProvided[formData.mountProvided]?.label);
  addLine(PRICING.tvMount.existingOutlet[formData.existingOutlet], PRICING.tvMount.existingOutlet[formData.existingOutlet]?.label);
  addLine(PRICING.tvMount.wireConceal[formData.wireConceal], PRICING.tvMount.wireConceal[formData.wireConceal]?.label);
  addLine(PRICING.tvMount.powerWork[formData.powerWork], PRICING.tvMount.powerWork[formData.powerWork]?.label);
  addLine(PRICING.tvMount.lowVoltage[formData.lowVoltage], PRICING.tvMount.lowVoltage[formData.lowVoltage]?.label);
  addLine(PRICING.tvMount.soundbarInstall[formData.soundbarInstall], PRICING.tvMount.soundbarInstall[formData.soundbarInstall]?.label);
  addLine(PRICING.tvMount.wallPatchPaint[formData.wallPatchPaint], PRICING.tvMount.wallPatchPaint[formData.wallPatchPaint]?.label);
  addLine(PRICING.tvMount.mountHeight[formData.mountHeight], PRICING.tvMount.mountHeight[formData.mountHeight]?.label);

  let hours = 2;
  if (formData.mountType === "fireplace") hours = 3;
  if (formData.mountType === "corner") hours = 2.5;
  if (formData.mountType === "notSure") hours = 2.5;
  if (formData.tvSize === "large") hours += 0.5;
  if (formData.tvSize === "xlarge") hours += 1;
  if (formData.wireConceal === "cover") hours += 0.5;
  if (formData.wireConceal === "inWall") hours += 1.5;
  if (formData.powerWork === "yes") hours += 1.5;
  if (formData.lowVoltage === "yes") hours += 0.75;
  if (formData.wallPatchPaint === "patchOnly") hours += 0.75;
  if (formData.wallPatchPaint === "patchPaint") hours += 1.5;
  if (formData.wallPatchPaint === "notSure") hours += 1;
  hours = Math.round(hours * 10) / 10;

  const laborMin = estimate.laborMin;
  const laborMax = estimate.laborMax;
  const totalMin = estimate.matMin + laborMin;
  const totalMax = estimate.matMax + laborMax;

  return applyMarketAndPropertyAdjustments(
    {
      hours,
      minMaterials: estimate.matMin,
      maxMaterials: estimate.matMax,
      laborMin,
      laborMax,
      totalMin,
      totalMax,
      materialsList: ["Mount bracket", "Fasteners", "Cable management", "Outlet and low-voltage materials"],
      adjustments: estimate.breakdown,
      internalAdjustments: [
        `Service zone: ${leadMeta.serviceZone}`,
        `Distance band: ${leadMeta.distanceBand}`,
        `Lead priority: ${leadMeta.leadPriority}`
      ],
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
    adjustments.push(
      `Quantity adjustment for ${formData.paintRoomCount === "5plus" ? "5+" : formData.paintRoomCount} rooms`
    );
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
function getCurrentPlumbingBasicsValues() {
  switch (projectType.value) {
    case "plumbing_replace_faucet":
      return {
        plumbingReason: document.getElementById("plumbingFaucetReason")?.value || "",
        plumbingLocation: document.getElementById("plumbingFaucetLocation")?.value || "",
        plumbingSeverity: document.getElementById("plumbingFaucetSeverity")?.value || ""
      };

    case "plumbing_replace_toilet":
      return {
        plumbingReason: document.getElementById("plumbingToiletReason")?.value || "",
        plumbingLocation: document.getElementById("plumbingToiletLocation")?.value || "",
        plumbingSeverity: document.getElementById("plumbingToiletSeverity")?.value || ""
      };

    case "plumbing_replace_vanity":
      return {
        plumbingReason: document.getElementById("plumbingVanityReason")?.value || "",
        plumbingLocation: document.getElementById("plumbingVanityLocation")?.value || "",
        plumbingSeverity: document.getElementById("plumbingVanitySeverity")?.value || ""
      };

    case "plumbing_replace_garbage_disposal":
      return {
        plumbingReason: document.getElementById("plumbingDisposalReason")?.value || "",
        plumbingLocation: document.getElementById("plumbingDisposalLocation")?.value || "",
        plumbingSeverity: document.getElementById("plumbingDisposalSeverity")?.value || ""
      };

    case "plumbing_replace_shutoff_valves":
      return {
        plumbingReason: document.getElementById("plumbingShutoffReason")?.value || "",
        plumbingLocation: document.getElementById("plumbingShutoffLocation")?.value || "",
        plumbingSeverity: document.getElementById("plumbingShutoffSeverity")?.value || ""
      };

    case "plumbing_fix_active_leak":
      return {
        plumbingReason: document.getElementById("plumbingLeakType")?.value || "",
        plumbingLocation: document.getElementById("plumbingLeakLocation")?.value || "",
        plumbingSeverity: document.getElementById("plumbingLeakCondition")?.value || ""
      };

    case "plumbing_install_new_fixture":
      return {
        plumbingReason: document.getElementById("plumbingNewInstallGoal")?.value || "",
        plumbingLocation: document.getElementById("plumbingNewInstallLocation")?.value || "",
        plumbingSeverity: document.getElementById("plumbingNewInstallCondition")?.value || ""
      };

    default:
      return {
        plumbingReason: "",
        plumbingLocation: "",
        plumbingSeverity: ""
      };
  }
}

function getCurrentPlumbingDetailsValues() {
  switch (projectType.value) {
    case "plumbing_replace_faucet":
      return {
        plumbingHasFixture: document.getElementById("plumbingFaucetHasFixture")?.value || "",
        plumbingShutoffCondition: document.getElementById("plumbingFaucetShutoffCondition")?.value || "",
        plumbingAccessDifficulty: document.getElementById("plumbingFaucetAccessDifficulty")?.value || "",
        plumbingVisibleDamage: document.getElementById("plumbingFaucetVisibleDamage")?.value || "",
        plumbingNotes: document.getElementById("notesPlumbingFaucet")?.value.trim() || "",

        plumbingLoose: "",
        plumbingFloorIssue: "",
        plumbingRepairScope: "",
        plumbingIncluded: "",
        plumbingSameSize: "",
        plumbingFinishTouchup: "",
        plumbingLeakDamage: "",
        plumbingScope: "",
        plumbingAreaDamage: "",
        plumbingPowerReady: "",
        plumbingValveCount: "",
        plumbingValveAccess: "",
        plumbingValveCondition: "",
        plumbingValvePartOfOtherProject: "",
        plumbingLeakDuration: "",
        plumbingAffectedSurfaces: "",
        plumbingDamageSigns: "",
        plumbingOpenAccessWork: "",
        plumbingRepairAfterStop: "",
        plumbingFixtureType: "",
        plumbingSupplyAvailable: "",
        plumbingDrainAvailable: "",
        plumbingOpeningNeeded: ""
      };

    case "plumbing_replace_toilet":
      return {
        plumbingHasFixture: document.getElementById("plumbingToiletHasFixture")?.value || "",
        plumbingShutoffCondition: "notSure",
        plumbingAccessDifficulty: document.getElementById("plumbingToiletAccessDifficulty")?.value || "",
        plumbingVisibleDamage: document.getElementById("plumbingToiletFloorIssue")?.value || "",
        plumbingNotes: document.getElementById("notesPlumbingToilet")?.value.trim() || "",

        plumbingLoose: document.getElementById("plumbingToiletLoose")?.value || "",
        plumbingFloorIssue: document.getElementById("plumbingToiletFloorIssue")?.value || "",
        plumbingRepairScope: document.getElementById("plumbingToiletRepairScope")?.value || "",
        plumbingIncluded: "",
        plumbingSameSize: "",
        plumbingFinishTouchup: "",
        plumbingLeakDamage: "",
        plumbingScope: "",
        plumbingAreaDamage: "",
        plumbingPowerReady: "",
        plumbingValveCount: "",
        plumbingValveAccess: "",
        plumbingValveCondition: "",
        plumbingValvePartOfOtherProject: "",
        plumbingLeakDuration: "",
        plumbingAffectedSurfaces: "",
        plumbingDamageSigns: "",
        plumbingOpenAccessWork: "",
        plumbingRepairAfterStop: "",
        plumbingFixtureType: "",
        plumbingSupplyAvailable: "",
        plumbingDrainAvailable: "",
        plumbingOpeningNeeded: ""
      };

    case "plumbing_replace_vanity":
      return {
        plumbingHasFixture: document.getElementById("plumbingVanityHasFixture")?.value || "",
        plumbingShutoffCondition: "notSure",
        plumbingAccessDifficulty: "notSure",
        plumbingVisibleDamage: document.getElementById("plumbingVanityLeakDamage")?.value || "",
        plumbingNotes: document.getElementById("notesPlumbingVanity")?.value.trim() || "",

        plumbingLoose: "",
        plumbingFloorIssue: "",
        plumbingRepairScope: "",
        plumbingIncluded: document.getElementById("plumbingVanityIncluded")?.value || "",
        plumbingSameSize: document.getElementById("plumbingVanitySameSize")?.value || "",
        plumbingFinishTouchup: document.getElementById("plumbingVanityFinishTouchup")?.value || "",
        plumbingLeakDamage: document.getElementById("plumbingVanityLeakDamage")?.value || "",
        plumbingScope: document.getElementById("plumbingVanityScope")?.value || "",
        plumbingAreaDamage: "",
        plumbingPowerReady: "",
        plumbingValveCount: "",
        plumbingValveAccess: "",
        plumbingValveCondition: "",
        plumbingValvePartOfOtherProject: "",
        plumbingLeakDuration: "",
        plumbingAffectedSurfaces: "",
        plumbingDamageSigns: "",
        plumbingOpenAccessWork: "",
        plumbingRepairAfterStop: "",
        plumbingFixtureType: "",
        plumbingSupplyAvailable: "",
        plumbingDrainAvailable: "",
        plumbingOpeningNeeded: ""
      };

    case "plumbing_replace_garbage_disposal":
      return {
        plumbingHasFixture: document.getElementById("plumbingDisposalHasFixture")?.value || "",
        plumbingShutoffCondition: "notSure",
        plumbingAccessDifficulty: document.getElementById("plumbingDisposalAccessDifficulty")?.value || "",
        plumbingVisibleDamage: document.getElementById("plumbingDisposalAreaDamage")?.value || "",
        plumbingNotes: document.getElementById("notesPlumbingDisposal")?.value.trim() || "",

        plumbingLoose: "",
        plumbingFloorIssue: "",
        plumbingRepairScope: "",
        plumbingIncluded: "",
        plumbingSameSize: "",
        plumbingFinishTouchup: "",
        plumbingLeakDamage: "",
        plumbingScope: document.getElementById("plumbingDisposalScope")?.value || "",
        plumbingAreaDamage: document.getElementById("plumbingDisposalAreaDamage")?.value || "",
        plumbingPowerReady: document.getElementById("plumbingDisposalPowerReady")?.value || "",
        plumbingValveCount: "",
        plumbingValveAccess: "",
        plumbingValveCondition: "",
        plumbingValvePartOfOtherProject: "",
        plumbingLeakDuration: "",
        plumbingAffectedSurfaces: "",
        plumbingDamageSigns: "",
        plumbingOpenAccessWork: "",
        plumbingRepairAfterStop: "",
        plumbingFixtureType: "",
        plumbingSupplyAvailable: "",
        plumbingDrainAvailable: "",
        plumbingOpeningNeeded: ""
      };

    case "plumbing_replace_shutoff_valves":
      return {
        plumbingHasFixture: "yes",
        plumbingShutoffCondition: document.getElementById("plumbingValveCondition")?.value || "",
        plumbingAccessDifficulty: document.getElementById("plumbingValveAccess")?.value || "",
        plumbingVisibleDamage: "no",
        plumbingNotes: document.getElementById("notesPlumbingShutoff")?.value.trim() || "",

        plumbingLoose: "",
        plumbingFloorIssue: "",
        plumbingRepairScope: "",
        plumbingIncluded: "",
        plumbingSameSize: "",
        plumbingFinishTouchup: "",
        plumbingLeakDamage: "",
        plumbingScope: document.getElementById("plumbingValveScope")?.value || "",
        plumbingAreaDamage: "",
        plumbingPowerReady: "",
        plumbingValveCount: document.getElementById("plumbingValveCount")?.value || "",
        plumbingValveAccess: document.getElementById("plumbingValveAccess")?.value || "",
        plumbingValveCondition: document.getElementById("plumbingValveCondition")?.value || "",
        plumbingValvePartOfOtherProject: document.getElementById("plumbingValvePartOfOtherProject")?.value || "",
        plumbingLeakDuration: "",
        plumbingAffectedSurfaces: "",
        plumbingDamageSigns: "",
        plumbingOpenAccessWork: "",
        plumbingRepairAfterStop: "",
        plumbingFixtureType: "",
        plumbingSupplyAvailable: "",
        plumbingDrainAvailable: "",
        plumbingOpeningNeeded: ""
      };

    case "plumbing_fix_active_leak":
      return {
        plumbingHasFixture: "notSure",
        plumbingShutoffCondition: "notSure",
        plumbingAccessDifficulty: document.getElementById("plumbingLeakAccessDifficulty")?.value || "",
        plumbingVisibleDamage: document.getElementById("plumbingLeakDamageSigns")?.value || "",
        plumbingNotes: document.getElementById("notesPlumbingLeak")?.value.trim() || "",

        plumbingLoose: "",
        plumbingFloorIssue: "",
        plumbingRepairScope: "",
        plumbingIncluded: "",
        plumbingSameSize: "",
        plumbingFinishTouchup: "",
        plumbingLeakDamage: "",
        plumbingScope: "",
        plumbingAreaDamage: "",
        plumbingPowerReady: "",
        plumbingValveCount: "",
        plumbingValveAccess: "",
        plumbingValveCondition: "",
        plumbingValvePartOfOtherProject: "",
        plumbingLeakDuration: document.getElementById("plumbingLeakDuration")?.value || "",
        plumbingAffectedSurfaces: document.getElementById("plumbingLeakAffectedSurfaces")?.value || "",
        plumbingDamageSigns: document.getElementById("plumbingLeakDamageSigns")?.value || "",
        plumbingOpenAccessWork: document.getElementById("plumbingLeakOpenAccessWork")?.value || "",
        plumbingRepairAfterStop: document.getElementById("plumbingLeakRepairAfterStop")?.value || "",
        plumbingFixtureType: "",
        plumbingSupplyAvailable: "",
        plumbingDrainAvailable: "",
        plumbingOpeningNeeded: ""
      };

    case "plumbing_install_new_fixture":
      return {
        plumbingHasFixture: document.getElementById("plumbingNewInstallHasFixture")?.value || "",
        plumbingShutoffCondition: "notSure",
        plumbingAccessDifficulty: document.getElementById("plumbingNewInstallAccessDifficulty")?.value || "",
        plumbingVisibleDamage: "no",
        plumbingNotes: document.getElementById("notesPlumbingNewInstall")?.value.trim() || "",

        plumbingLoose: "",
        plumbingFloorIssue: "",
        plumbingRepairScope: document.getElementById("plumbingNewInstallRepairScope")?.value || "",
        plumbingIncluded: "",
        plumbingSameSize: "",
        plumbingFinishTouchup: "",
        plumbingLeakDamage: "",
        plumbingScope: "",
        plumbingAreaDamage: "",
        plumbingPowerReady: "",
        plumbingValveCount: "",
        plumbingValveAccess: "",
        plumbingValveCondition: "",
        plumbingValvePartOfOtherProject: "",
        plumbingLeakDuration: "",
        plumbingAffectedSurfaces: "",
        plumbingDamageSigns: "",
        plumbingOpenAccessWork: "",
        plumbingRepairAfterStop: "",
        plumbingFixtureType: document.getElementById("plumbingNewInstallFixtureType")?.value || "",
        plumbingSupplyAvailable: document.getElementById("plumbingNewInstallSupplyAvailable")?.value || "",
        plumbingDrainAvailable: document.getElementById("plumbingNewInstallDrainAvailable")?.value || "",
        plumbingOpeningNeeded: document.getElementById("plumbingNewInstallOpeningNeeded")?.value || ""
      };

    default:
      return {
        plumbingHasFixture: "",
        plumbingShutoffCondition: "",
        plumbingAccessDifficulty: "",
        plumbingVisibleDamage: "",
        plumbingNotes: "",

        plumbingLoose: "",
        plumbingFloorIssue: "",
        plumbingRepairScope: "",
        plumbingIncluded: "",
        plumbingSameSize: "",
        plumbingFinishTouchup: "",
        plumbingLeakDamage: "",
        plumbingScope: "",
        plumbingAreaDamage: "",
        plumbingPowerReady: "",
        plumbingValveCount: "",
        plumbingValveAccess: "",
        plumbingValveCondition: "",
        plumbingValvePartOfOtherProject: "",
        plumbingLeakDuration: "",
        plumbingAffectedSurfaces: "",
        plumbingDamageSigns: "",
        plumbingOpenAccessWork: "",
        plumbingRepairAfterStop: "",
        plumbingFixtureType: "",
        plumbingSupplyAvailable: "",
        plumbingDrainAvailable: "",
        plumbingOpeningNeeded: ""
      };
  }
}

function getCurrentPlumbingFilesInput() {
  switch (projectType.value) {
    case "plumbing_replace_faucet":
      return document.getElementById("projectFilesPlumbingFaucet");
    case "plumbing_replace_toilet":
      return document.getElementById("projectFilesPlumbingToilet");
    case "plumbing_replace_vanity":
      return document.getElementById("projectFilesPlumbingVanity");
    case "plumbing_replace_garbage_disposal":
      return document.getElementById("projectFilesPlumbingDisposal");
    case "plumbing_replace_shutoff_valves":
      return document.getElementById("projectFilesPlumbingShutoff");
    case "plumbing_fix_active_leak":
      return document.getElementById("projectFilesPlumbingLeak");
    case "plumbing_install_new_fixture":
      return document.getElementById("projectFilesPlumbingNewInstall");
    default:
      return null;
  }
}

function getUploadedFiles() {
  if (projectType.value === "lighting_add_replace") return projectFilesLighting.files;
  if (projectType.value === "paint_one_room") return projectFilesPaint.files;
  if (isPlumbingProject(projectType.value)) {
    const plumbingFilesInput = getCurrentPlumbingFilesInput();
    return plumbingFilesInput ? plumbingFilesInput.files : null;
  }
  return projectFiles.files;
}

function getFormData() {
  const plumbingBasics = getCurrentPlumbingBasicsValues();
  const plumbingDetails = getCurrentPlumbingDetailsValues();

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
    paintBlend: "not-sure",
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

    mountType: mountType.value,
    wallType: wallType.value,
    tvSize: tvSize.value,
    mountProvided: mountProvided.value,
    existingOutlet: existingOutlet.value,
    wireConceal: wireConceal.value,
    powerWork: powerWork.value,
    lowVoltage: lowVoltage.value,
    soundbarInstall: soundbarInstall.value,
    wallPatchPaint: wallPatchPaint.value,
    mountHeight: mountHeight.value,
    notesTvMount: notesTvMount.value.trim(),

    ...plumbingBasics,
    ...plumbingDetails
  };
}

async function submitLead(leadType, estimateData, additionalFormData = null) {
  const formData = additionalFormData || getFormData();
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
  } else if (formData.projectType === "tv_mount_install") {
    payload.append("mount_type", formData.mountType);
    payload.append("wall_type", formData.wallType);
    payload.append("tv_size", formData.tvSize);
    payload.append("mount_provided", formData.mountProvided);
    payload.append("existing_outlet", formData.existingOutlet);
    payload.append("wire_conceal", formData.wireConceal);
    payload.append("power_work", formData.powerWork);
    payload.append("low_voltage", formData.lowVoltage);
    payload.append("soundbar_install", formData.soundbarInstall);
    payload.append("wall_patch_paint", formData.wallPatchPaint);
    payload.append("mount_height", formData.mountHeight);
    payload.append("notes", formData.notesTvMount);
  } else if (isPlumbingProject(formData.projectType)) {
    payload.append("plumbing_reason", formData.plumbingReason);
    payload.append("plumbing_location", formData.plumbingLocation);
    payload.append("plumbing_severity", formData.plumbingSeverity);
    payload.append("plumbing_has_fixture", formData.plumbingHasFixture);
    payload.append("plumbing_shutoff_condition", formData.plumbingShutoffCondition);
    payload.append("plumbing_access_difficulty", formData.plumbingAccessDifficulty);
    payload.append("plumbing_visible_damage", formData.plumbingVisibleDamage);

    payload.append("plumbing_loose", formData.plumbingLoose);
    payload.append("plumbing_floor_issue", formData.plumbingFloorIssue);
    payload.append("plumbing_repair_scope", formData.plumbingRepairScope);
    payload.append("plumbing_included", formData.plumbingIncluded);
    payload.append("plumbing_same_size", formData.plumbingSameSize);
    payload.append("plumbing_finish_touchup", formData.plumbingFinishTouchup);
    payload.append("plumbing_leak_damage", formData.plumbingLeakDamage);
    payload.append("plumbing_scope", formData.plumbingScope);
    payload.append("plumbing_area_damage", formData.plumbingAreaDamage);
    payload.append("plumbing_power_ready", formData.plumbingPowerReady);
    payload.append("plumbing_valve_count", formData.plumbingValveCount);
    payload.append("plumbing_valve_access", formData.plumbingValveAccess);
    payload.append("plumbing_valve_condition", formData.plumbingValveCondition);
    payload.append("plumbing_valve_part_of_other_project", formData.plumbingValvePartOfOtherProject);
    payload.append("plumbing_leak_duration", formData.plumbingLeakDuration);
    payload.append("plumbing_affected_surfaces", formData.plumbingAffectedSurfaces);
    payload.append("plumbing_damage_signs", formData.plumbingDamageSigns);
    payload.append("plumbing_open_access_work", formData.plumbingOpenAccessWork);
    payload.append("plumbing_repair_after_stop", formData.plumbingRepairAfterStop);
    payload.append("plumbing_fixture_type", formData.plumbingFixtureType);
    payload.append("plumbing_supply_available", formData.plumbingSupplyAvailable);
    payload.append("plumbing_drain_available", formData.plumbingDrainAvailable);
    payload.append("plumbing_opening_needed", formData.plumbingOpeningNeeded);

    payload.append("notes", formData.plumbingNotes);
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

  // Add payment details if this is a paid lead
  if (leadType === "PAID" && additionalFormData) {
    payload.append("payment_status", additionalFormData.paymentStatus || "completed");
    payload.append("payment_method", additionalFormData.paymentMethod || "stripe");
    payload.append("working_price", `$${additionalFormData.workingPrice}`);
  }

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

    // Validate full name - at least 2 characters and contains only letters, spaces, and hyphens
    if (fullName.length < 2 || !/^[a-zA-Z\s\-']+$/.test(fullName)) {
      showValidation(validationStep2, "Please enter a valid full name.");
      return false;
    }

    // Validate phone - at least 10 digits (allows formatting like (123) 456-7890)
    const phoneDigitsOnly = phone.replace(/\D/g, "");
    if (phoneDigitsOnly.length < 10) {
      showValidation(validationStep2, "Please enter a valid phone number with at least 10 digits.");
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showValidation(validationStep2, "Please enter a valid email address.");
      return false;
    }

    // Validate ZIP code - 5 or 9 digits (allows ZIP+4 format)
    const zipcodeDigitsOnly = zipcode.replace(/\D/g, "");
    if (zipcodeDigitsOnly.length !== 5 && zipcodeDigitsOnly.length !== 9) {
      showValidation(validationStep2, "Please enter a valid ZIP code (5 or 9 digits).");
      return false;
    }
  }

  if (step === 3) {
    clearValidation(validationStep3);

    if (projectType.value === "paint_one_room" && getSelectedPaintScopes().length === 0) {
      showValidation(validationStep3, "Please select at least one area to paint before continuing.");
      return false;
    }

    if (projectType.value === "tv_mount_install") {
      if (!mountType.value || !wallType.value || !tvSize.value || !mountProvided.value || !existingOutlet.value) {
        showValidation(validationStep3, "Please complete the basic TV mount questions before continuing.");
        return false;
      }
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
  
  // Calculate working price as the average of min and max totals
  const workingPrice = Math.round((estimateData.totalMin + estimateData.totalMax) / 2);
  workingPriceOutput.textContent = currency(workingPrice);
  
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
  updateLightingConditionalFields();
  updateTvMountConditionalFields();
  updatePaintConditionalFields();
  updatePlumbingConditionalUI();
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

tvMountProjectOption.addEventListener("click", () => {
  setSelectedProject("tv_mount_install", "TV Mount Installation");
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

lightingType.addEventListener("change", updateLightingConditionalFields);
lightingLocation.addEventListener("change", updateLightingConditionalFields);
accessDifficulty.addEventListener("change", updateLightingConditionalFields);
wireRun.addEventListener("change", updateLightingConditionalFields);
atticAccess.addEventListener("change", updateLightingConditionalFields);
repairIncluded.addEventListener("change", updateLightingConditionalFields);
paintAfterRepair.addEventListener("change", updateLightingConditionalFields);

paintScopeCheckboxes.forEach((cb) => cb.addEventListener("change", updatePaintConditionalFields));
paintYearBuilt.addEventListener("change", updatePaintConditionalFields);
wireConceal.addEventListener("change", updateTvMountConditionalFields);
powerWork.addEventListener("change", updateTvMountConditionalFields);

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
  } else if (formData.projectType === "tv_mount_install") {
    latestEstimate = calculateTvMountEstimate(formData);
  } else if (isPlumbingProject(formData.projectType)) {
    latestEstimate = calculatePlumbingEstimate(formData);
  } else {
    latestEstimate = calculateDrywallEstimate(formData);
  }

  renderEstimate(latestEstimate, formData);
  function updatePlumbingConditionalUI() {
  const type = projectType.value;

  hideAllPlumbingSubsections();

  if (!isPlumbingProject(type)) return;

  plumbingBasicsSection.classList.remove("hidden");
  plumbingDetailsSection.classList.remove("hidden");
  showPlumbingSectionsByProject(type);
}

function calculatePlumbingEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const adjustments = [];
  const internalAdjustments = [];

  internalAdjustments.push(`Service zone: ${leadMeta.serviceZone}`);
  internalAdjustments.push(`Distance band: ${leadMeta.distanceBand}`);
  internalAdjustments.push(`Lead priority: ${leadMeta.leadPriority}`);

  let minMaterials = 0;
  let maxMaterials = 0;
  let laborMin = 0;
  let laborMax = 0;
  let hours = 0;
  let materialsList = [];

  if (formData.projectType === "plumbing_replace_faucet") {
    const cfg = PRICING.plumbing.faucet;

    laborMin += cfg.baseLaborMin;
    laborMax += cfg.baseLaborMax;
    hours += cfg.hours;
    materialsList = cfg.materials;
    adjustments.push("Base faucet replacement");

    if (formData.plumbingHasFixture === "no") {
      minMaterials += cfg.fixtureAllowanceMin;
      maxMaterials += cfg.fixtureAllowanceMax;
      adjustments.push("Fixture allowance included");
    } else if (formData.plumbingHasFixture === "notSure") {
      minMaterials += cfg.fixtureAllowanceMin * 0.5;
      maxMaterials += cfg.fixtureAllowanceMax * 0.7;
      adjustments.push("Fixture allowance may be needed");
    }

    if (formData.plumbingShutoffCondition === "no") {
      laborMin += cfg.shutoffAddLaborMin;
      laborMax += cfg.shutoffAddLaborMax;
      minMaterials += cfg.shutoffAddMatMin;
      maxMaterials += cfg.shutoffAddMatMax;
      adjustments.push("Shutoff valves may need replacement");
    } else if (formData.plumbingShutoffCondition === "notSure") {
      laborMin += 30;
      laborMax += 60;
      minMaterials += 10;
      maxMaterials += 25;
      adjustments.push("Shutoff condition to be confirmed");
    }

    if (formData.plumbingSeverity === "active") {
      laborMin += cfg.activeIssueAddLaborMin;
      laborMax += cfg.activeIssueAddLaborMax;
      adjustments.push("Active plumbing issue adjustment");
    } else if (formData.plumbingSeverity === "damage") {
      laborMin += 60;
      laborMax += 120;
      adjustments.push("Possible surrounding damage adjustment");
    }

    const accessAdj = cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure;
    laborMin += accessAdj.laborMin;
    laborMax += accessAdj.laborMax;
    if (formData.plumbingAccessDifficulty !== "easy") {
      adjustments.push("Access difficulty adjustment");
    }

    if (formData.plumbingVisibleDamage === "minor") {
      laborMin += 40;
      laborMax += 90;
      minMaterials += 15;
      maxMaterials += 40;
      adjustments.push("Minor visible damage");
    } else if (formData.plumbingVisibleDamage === "major") {
      laborMin += 100;
      laborMax += 220;
      minMaterials += 35;
      maxMaterials += 90;
      adjustments.push("Major visible damage");
    } else if (formData.plumbingVisibleDamage === "notSure") {
      laborMin += 50;
      laborMax += 110;
      minMaterials += 20;
      maxMaterials += 50;
      adjustments.push("Visible damage to be confirmed");
    }
  }

  else if (formData.projectType === "plumbing_replace_toilet") {
    const cfg = PRICING.plumbing.toilet;

    laborMin += cfg.baseLaborMin;
    laborMax += cfg.baseLaborMax;
    hours += cfg.hours;
    minMaterials += 25;
    maxMaterials += 60;
    materialsList = cfg.materials;
    adjustments.push("Base toilet replacement");

    if (formData.plumbingHasFixture === "no") {
      minMaterials += cfg.fixtureAllowanceMin;
      maxMaterials += cfg.fixtureAllowanceMax;
      adjustments.push("Toilet fixture allowance included");
    } else if (formData.plumbingHasFixture === "notSure") {
      minMaterials += 60;
      maxMaterials += 140;
      adjustments.push("Fixture allowance may be needed");
    }

    const floorAdj = cfg.floorIssue[formData.plumbingFloorIssue] || cfg.floorIssue.notSure;
    laborMin += floorAdj.laborMin;
    laborMax += floorAdj.laborMax;
    minMaterials += floorAdj.matMin;
    maxMaterials += floorAdj.matMax;
    if (formData.plumbingFloorIssue !== "no") {
      adjustments.push("Floor condition adjustment");
    }

    const looseAdj = cfg.loose[formData.plumbingLoose] || cfg.loose.notSure;
    laborMin += looseAdj.laborMin;
    laborMax += looseAdj.laborMax;
    if (formData.plumbingLoose !== "no") {
      adjustments.push("Loose / rocking toilet adjustment");
    }

    const accessAdj = cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure;
    laborMin += accessAdj.laborMin;
    laborMax += accessAdj.laborMax;
    if (formData.plumbingAccessDifficulty !== "easy") {
      adjustments.push("Access difficulty adjustment");
    }

    if (formData.plumbingRepairScope === "includeRepairsIfNeeded") {
      laborMin += 60;
      laborMax += 140;
      minMaterials += 20;
      maxMaterials += 60;
      adjustments.push("Surrounding repairs allowed if needed");
    }

    if (formData.plumbingSeverity === "active") {
      laborMin += 80;
      laborMax += 160;
      adjustments.push("Active issue adjustment");
    } else if (formData.plumbingSeverity === "damage") {
      laborMin += 50;
      laborMax += 110;
      adjustments.push("Possible surrounding damage");
    }
  }

  else if (formData.projectType === "plumbing_replace_vanity") {
    const cfg = PRICING.plumbing.vanity;

    laborMin += cfg.baseLaborMin;
    laborMax += cfg.baseLaborMax;
    hours += cfg.hours;
    minMaterials += 35;
    maxMaterials += 90;
    materialsList = cfg.materials;
    adjustments.push("Base vanity replacement");

    if (formData.plumbingHasFixture === "no") {
      minMaterials += cfg.fixtureAllowanceMin;
      maxMaterials += cfg.fixtureAllowanceMax;
      adjustments.push("Vanity allowance included");
    } else if (formData.plumbingHasFixture === "notSure") {
      minMaterials += 80;
      maxMaterials += 180;
      adjustments.push("Vanity allowance may be needed");
    }

    const sameSizeAdj = cfg.sameSize[formData.plumbingSameSize] || cfg.sameSize.notSure;
    laborMin += sameSizeAdj.laborMin;
    laborMax += sameSizeAdj.laborMax;
    if (formData.plumbingSameSize !== "yes") {
      adjustments.push("Size / fit adjustment");
    }

    const touchAdj = cfg.touchup[formData.plumbingFinishTouchup] || cfg.touchup.notSure;
    laborMin += touchAdj.laborMin;
    laborMax += touchAdj.laborMax;
    if (formData.plumbingFinishTouchup !== "no") {
      adjustments.push("Finish touch-up adjustment");
    }

    const leakAdj = cfg.leakDamage[formData.plumbingLeakDamage] || cfg.leakDamage.notSure;
    laborMin += leakAdj.laborMin;
    laborMax += leakAdj.laborMax;
    minMaterials += leakAdj.matMin;
    maxMaterials += leakAdj.matMax;
    if (formData.plumbingLeakDamage !== "no") {
      adjustments.push("Leak / water damage adjustment");
    }

    if (formData.plumbingScope === "includeRelatedPlumbing") {
      laborMin += 70;
      laborMax += 150;
      minMaterials += 20;
      maxMaterials += 50;
      adjustments.push("Related plumbing components allowed");
    }

    if (formData.plumbingIncluded === "vanityTop") {
      laborMin += 40;
      laborMax += 80;
      adjustments.push("Vanity with top");
    } else if (formData.plumbingIncluded === "vanityTopFaucet") {
      laborMin += 90;
      laborMax += 180;
      adjustments.push("Vanity with top and faucet");
    }
  }

  else if (formData.projectType === "plumbing_replace_garbage_disposal") {
    const cfg = PRICING.plumbing.garbageDisposal;

    laborMin += cfg.baseLaborMin;
    laborMax += cfg.baseLaborMax;
    hours += cfg.hours;
    minMaterials += 20;
    maxMaterials += 50;
    materialsList = cfg.materials;
    adjustments.push("Base garbage disposal replacement");

    if (formData.plumbingHasFixture === "no") {
      minMaterials += cfg.fixtureAllowanceMin;
      maxMaterials += cfg.fixtureAllowanceMax;
      adjustments.push("Garbage disposal allowance included");
    } else if (formData.plumbingHasFixture === "notSure") {
      minMaterials += 60;
      maxMaterials += 140;
      adjustments.push("Fixture allowance may be needed");
    }

    const areaAdj = cfg.areaDamage[formData.plumbingAreaDamage] || cfg.areaDamage.notSure;
    laborMin += areaAdj.laborMin;
    laborMax += areaAdj.laborMax;
    if (formData.plumbingAreaDamage !== "no") {
      adjustments.push("Sink area damage adjustment");
    }

    const powerAdj = cfg.powerReady[formData.plumbingPowerReady] || cfg.powerReady.notSure;
    laborMin += powerAdj.laborMin;
    laborMax += powerAdj.laborMax;
    minMaterials += powerAdj.matMin;
    maxMaterials += powerAdj.matMax;
    if (formData.plumbingPowerReady !== "yes") {
      adjustments.push("Power readiness adjustment");
    }

    const accessAdj = cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure;
    laborMin += accessAdj.laborMin;
    laborMax += accessAdj.laborMax;
    if (formData.plumbingAccessDifficulty !== "easy") {
      adjustments.push("Access difficulty adjustment");
    }

    if (formData.plumbingScope === "includeSinkAreaIssuesIfNeeded") {
      laborMin += 60;
      laborMax += 130;
      minMaterials += 15;
      maxMaterials += 40;
      adjustments.push("Sink-area issues allowed if needed");
    }
  }

  else if (formData.projectType === "plumbing_replace_shutoff_valves") {
    const cfg = PRICING.plumbing.shutoff;
    const valveCount = formData.plumbingValveCount === "4plus" ? 4 : parseInt(formData.plumbingValveCount || "1", 10);

    let laborMultiplier = 1;
    if (valveCount === 2) {
      laborMultiplier = 1 + cfg.secondValveMultiplier;
    } else if (valveCount >= 3) {
      laborMultiplier = 1 + cfg.secondValveMultiplier + ((valveCount - 2) * cfg.extraValveMultiplier);
    }

    laborMin += cfg.baseOneLaborMin * laborMultiplier;
    laborMax += cfg.baseOneLaborMax * laborMultiplier;
    hours += 1.5 * laborMultiplier;
    minMaterials += cfg.baseMatMin * valveCount;
    maxMaterials += cfg.baseMatMax * valveCount;
    materialsList = cfg.materials;
    adjustments.push(`Base shutoff valve replacement for ${valveCount} valve(s)`);

    const accessAdj = cfg.access[formData.plumbingValveAccess] || cfg.access.moderate;
    laborMin += accessAdj.laborMin;
    laborMax += accessAdj.laborMax;
    if (formData.plumbingValveAccess !== "easy") {
      adjustments.push("Valve access adjustment");
    }

    const condAdj = cfg.condition[formData.plumbingValveCondition] || cfg.condition.notSure;
    laborMin += condAdj.laborMin;
    laborMax += condAdj.laborMax;
    if (formData.plumbingValveCondition !== "normal") {
      adjustments.push("Valve condition adjustment");
    }

    if (formData.plumbingValvePartOfOtherProject === "yes") {
      laborMin -= 40;
      laborMax -= 40;
      adjustments.push("Bundled with another plumbing project");
    }

    if (formData.plumbingScope === "includeNearbyIssuesIfNeeded") {
      laborMin += 50;
      laborMax += 120;
      minMaterials += 10;
      maxMaterials += 35;
      adjustments.push("Nearby plumbing issues allowed if needed");
    }
  }

  else if (formData.projectType === "plumbing_fix_active_leak") {
    const cfg = PRICING.plumbing.leak;
    const accessType = (cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure).type;

    if (accessType === "accessible") {
      laborMin += cfg.accessibleLaborMin;
      laborMax += cfg.accessibleLaborMax;
      minMaterials += cfg.accessibleMatMin;
      maxMaterials += cfg.accessibleMatMax;
      hours += cfg.accessibleHours;
      adjustments.push("Accessible leak repair base");
    } else {
      laborMin += cfg.behindWallLaborMin;
      laborMax += cfg.behindWallLaborMax;
      minMaterials += cfg.behindWallMatMin;
      maxMaterials += cfg.behindWallMatMax;
      hours += cfg.behindWallHours;
      adjustments.push("Concealed / behind-wall leak base");
    }

    const accessAdj = cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure;
    laborMin += accessAdj.laborMin || 0;
    laborMax += accessAdj.laborMax || 0;

    const durationAdj = cfg.duration[formData.plumbingLeakDuration] || cfg.duration.notSure;
    laborMin += durationAdj.laborMin;
    laborMax += durationAdj.laborMax;
    if (formData.plumbingLeakDuration !== "today") {
      adjustments.push("Leak duration adjustment");
    }

    const surfAdj = cfg.affectedSurfaces[formData.plumbingAffectedSurfaces] || cfg.affectedSurfaces.notSure;
    laborMin += surfAdj.laborMin;
    laborMax += surfAdj.laborMax;
    if (formData.plumbingAffectedSurfaces !== "no") {
      adjustments.push("Affected surfaces adjustment");
    }

    const dmgAdj = cfg.damageSigns[formData.plumbingDamageSigns] || cfg.damageSigns.notSure;
    laborMin += dmgAdj.laborMin;
    laborMax += dmgAdj.laborMax;
    if (formData.plumbingDamageSigns !== "no") {
      adjustments.push("Damage signs adjustment");
    }

    const openAdj = cfg.openAccessWork[formData.plumbingOpenAccessWork] || cfg.openAccessWork.notSure;
    laborMin += openAdj.laborMin;
    laborMax += openAdj.laborMax;
    if (formData.plumbingOpenAccessWork !== "no") {
      adjustments.push("Opening / access work allowed");
    }

    const repairAdj = cfg.repairAfterStop[formData.plumbingRepairAfterStop] || cfg.repairAfterStop.notSure;
    laborMin += repairAdj.laborMin;
    laborMax += repairAdj.laborMax;
    if (formData.plumbingRepairAfterStop !== "no") {
      adjustments.push("Post-leak repairs allowed");
    }
  }

  else if (formData.projectType === "plumbing_install_new_fixture") {
    const cfg = PRICING.plumbing.newFixture;

    laborMin += cfg.baseLaborMin;
    laborMax += cfg.baseLaborMax;
    hours += cfg.hours;
    minMaterials += 30;
    maxMaterials += 80;
    materialsList = cfg.materials;
    adjustments.push("Base new plumbing fixture installation");

    if (formData.plumbingHasFixture === "no") {
      minMaterials += cfg.fixtureAllowanceMin;
      maxMaterials += cfg.fixtureAllowanceMax;
      adjustments.push("Fixture allowance included");
    } else if (formData.plumbingHasFixture === "notSure") {
      minMaterials += 40;
      maxMaterials += 100;
      adjustments.push("Fixture allowance may be needed");
    }

    const supplyAdj = cfg.supplyAvailable[formData.plumbingSupplyAvailable] || cfg.supplyAvailable.notSure;
    laborMin += supplyAdj.laborMin;
    laborMax += supplyAdj.laborMax;
    if (formData.plumbingSupplyAvailable !== "yes") {
      adjustments.push("Water supply adjustment");
    }

    const drainAdj = cfg.drainAvailable[formData.plumbingDrainAvailable] || cfg.drainAvailable.notSure;
    laborMin += drainAdj.laborMin;
    laborMax += drainAdj.laborMax;
    if (formData.plumbingDrainAvailable !== "yes") {
      adjustments.push("Drain line adjustment");
    }

    const openingAdj = cfg.openingNeeded[formData.plumbingOpeningNeeded] || cfg.openingNeeded.notSure;
    laborMin += openingAdj.laborMin;
    laborMax += openingAdj.laborMax;
    if (formData.plumbingOpeningNeeded !== "no") {
      adjustments.push("Opening work adjustment");
    }

    const accessAdj = cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure;
    laborMin += accessAdj.laborMin;
    laborMax += accessAdj.laborMax;
    if (formData.plumbingAccessDifficulty !== "easy") {
      adjustments.push("Access difficulty adjustment");
    }

    const repairAdj = cfg.repairScope[formData.plumbingRepairScope] || cfg.repairScope.installOnly;
    laborMin += repairAdj.laborMin;
    laborMax += repairAdj.laborMax;
    if (formData.plumbingRepairScope === "includeFinishRepairsIfNeeded") {
      adjustments.push("Finish repairs allowed if needed");
    }

    if (formData.plumbingSeverity === "openingLikelyNeeded") {
      laborMin += 70;
      laborMax += 140;
      adjustments.push("Likely opening / layout complexity");
    } else if (formData.plumbingSeverity === "somePlumbingNeeded") {
      laborMin += 50;
      laborMax += 110;
      adjustments.push("Some new plumbing work needed");
    }

    if (formData.plumbingFixtureType) {
      adjustments.push(`Fixture type: ${formData.plumbingFixtureType}`);
    }
  }

  minMaterials = Math.max(0, minMaterials);
  maxMaterials = Math.max(minMaterials, maxMaterials);
  laborMin = Math.max(0, laborMin);
  laborMax = Math.max(laborMin, laborMax);

  const totalMin = minMaterials + laborMin;
  const totalMax = maxMaterials + laborMax;

  return applyMarketAndPropertyAdjustments(
    {
      hours: Math.round(hours * 10) / 10,
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
  if (payNowBtn) payNowBtn.disabled = true;
  doneBtn.disabled = true;

  try {
    await submitLead("HOT", latestEstimate);
    hotLeadSubmitted = true;
    showHotCompletion();
  } catch (error) {
    console.error(error);
    hotLeadBtn.disabled = false;
    if (payNowBtn) payNowBtn.disabled = false;
    hotLeadBtn.textContent = "Get My Exact Quote";
    doneBtn.disabled = false;
    alert("We could not submit your request right now. Please try again.");
  }
});

doneBtn.addEventListener("click", () => {
  showDoneCompletion();
});

// PAYMENT FLOW HANDLERS
if (payNowBtn) {
  payNowBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Verify we have an estimate
    if (!latestEstimate) {
      alert("No estimate available");
      return;
    }

    // Get form data from Step 2
    const fullName = document.getElementById("fullName")?.value || "";
    const email = document.getElementById("email")?.value || "";
    const phone = document.getElementById("phone")?.value || "";
    const zipcode = document.getElementById("zipcode")?.value || "";
    const city = document.getElementById("city")?.value || "";

    if (!fullName || !email || !phone) {
      alert("Please fill in your name, email, and phone number");
      return;
    }

    // Calculate working price
    const workingPrice = Math.round(
      (latestEstimate.totalMin + latestEstimate.totalMax) / 2
    );

    // Build URL with parameters for the scheduler
    const params = new URLSearchParams({
      name: fullName,
      email: email,
      phone: phone,
      zip: zipcode,
      address: city,
      projectType: projectType.value,
      projectDisplayName: projectDisplayName.value,
      workingPrice: `$${workingPrice}`,
    });
    
    // Redirect to scheduler for appointment booking and payment
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const schedulerUrl = isLocalhost 
      ? `https://estimator-sqzv.onrender.com/scheduler.html?${params.toString()}`
      : `https://tamayenterprises.github.io/Estimator/scheduler.html?${params.toString()}`;
    window.location.href = schedulerUrl;
  });
}

// Submit payment button
if (submitPaymentBtn) {
  submitPaymentBtn.addEventListener("click", async (e) => {
    if (window.stripePayment && window.stripePayment.handlePaymentSubmit) {
      await window.stripePayment.handlePaymentSubmit(e);
    }
  });
}

// Cancel payment button
if (cancelPaymentBtn) {
  cancelPaymentBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Just hide payment section if it was shown
    const paymentSection = document.getElementById("paymentSection");
    if (paymentSection) {
      paymentSection.classList.add("hidden");
    }
  });
}

// Function to submit form with payment info
async function submitFormWithPayment(paymentMethod) {
  try {
    const formData = {
      fullName: document.getElementById("fullName")?.value,
      email: document.getElementById("email")?.value,
      phone: document.getElementById("phone")?.value,
      zipcode: document.getElementById("zipcode")?.value,
      city: document.getElementById("city")?.value,
      propertyType: document.getElementById("propertyType")?.value,
      ownerStatus: document.getElementById("ownerStatus")?.value,
      timeline: document.getElementById("timeline")?.value,
      projectType: projectType.value,
      projectDisplayName: projectDisplayName.value,
      paymentMethod: paymentMethod,
      paymentStatus: "completed",
      workingPrice: Math.round(
        (latestEstimate.totalMin + latestEstimate.totalMax) / 2
      ),
      estimateDetails: JSON.stringify(latestEstimate),
    };

    await submitLead("PAID", latestEstimate, formData);

    // Show payment completion screen
    if (paymentSection) {
      paymentSection.classList.add("hidden");
    }

    // Redirect to scheduler or show confirmation
    stepper.classList.add("hidden");
    showPaymentCompletion();
  } catch (error) {
    console.error("Error submitting form with payment:", error);
    alert("Failed to complete your request. Please try again.");
  }
}

// Show payment completion screen
function showPaymentCompletion() {
  const completionScreen = document.getElementById("paymentCompletionScreen");
  if (completionScreen) {
    completionScreen.classList.remove("hidden");
  }
}

function updatePlumbingConditionalUI() {
  const type = projectType.value;

  hideAllPlumbingSubsections();

  if (!isPlumbingProject(type)) return;

  plumbingBasicsSection.classList.remove("hidden");
  plumbingDetailsSection.classList.remove("hidden");
  showPlumbingSectionsByProject(type);
}

function calculatePlumbingEstimate(formData) {
  const leadMeta = classifyLead(formData);
  const adjustments = [];
  const internalAdjustments = [];

  internalAdjustments.push(`Service zone: ${leadMeta.serviceZone}`);
  internalAdjustments.push(`Distance band: ${leadMeta.distanceBand}`);
  internalAdjustments.push(`Lead priority: ${leadMeta.leadPriority}`);

  let minMaterials = 0;
  let maxMaterials = 0;
  let laborMin = 0;
  let laborMax = 0;
  let hours = 0;
  let materialsList = [];

  if (formData.projectType === "plumbing_replace_faucet") {
    const cfg = PRICING.plumbing.faucet;

    laborMin += cfg.baseLaborMin;
    laborMax += cfg.baseLaborMax;
    hours += cfg.hours;
    materialsList = cfg.materials;
    adjustments.push("Base faucet replacement");

    if (formData.plumbingHasFixture === "no") {
      minMaterials += cfg.fixtureAllowanceMin;
      maxMaterials += cfg.fixtureAllowanceMax;
      adjustments.push("Fixture allowance included");
    } else if (formData.plumbingHasFixture === "notSure") {
      minMaterials += cfg.fixtureAllowanceMin * 0.5;
      maxMaterials += cfg.fixtureAllowanceMax * 0.7;
      adjustments.push("Fixture allowance may be needed");
    }

    if (formData.plumbingShutoffCondition === "no") {
      laborMin += cfg.shutoffAddLaborMin;
      laborMax += cfg.shutoffAddLaborMax;
      minMaterials += cfg.shutoffAddMatMin;
      maxMaterials += cfg.shutoffAddMatMax;
      adjustments.push("Shutoff valves may need replacement");
    } else if (formData.plumbingShutoffCondition === "notSure") {
      laborMin += 30;
      laborMax += 60;
      minMaterials += 10;
      maxMaterials += 25;
      adjustments.push("Shutoff condition to be confirmed");
    }

    if (formData.plumbingSeverity === "active") {
      laborMin += cfg.activeIssueAddLaborMin;
      laborMax += cfg.activeIssueAddLaborMax;
      adjustments.push("Active plumbing issue adjustment");
    } else if (formData.plumbingSeverity === "damage") {
      laborMin += 60;
      laborMax += 120;
      adjustments.push("Possible surrounding damage adjustment");
    }

    const accessAdj = cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure;
    laborMin += accessAdj.laborMin;
    laborMax += accessAdj.laborMax;
    if (formData.plumbingAccessDifficulty !== "easy") {
      adjustments.push("Access difficulty adjustment");
    }

    if (formData.plumbingVisibleDamage === "minor") {
      laborMin += 40;
      laborMax += 90;
      minMaterials += 15;
      maxMaterials += 40;
      adjustments.push("Minor visible damage");
    } else if (formData.plumbingVisibleDamage === "major") {
      laborMin += 100;
      laborMax += 220;
      minMaterials += 35;
      maxMaterials += 90;
      adjustments.push("Major visible damage");
    } else if (formData.plumbingVisibleDamage === "notSure") {
      laborMin += 50;
      laborMax += 110;
      minMaterials += 20;
      maxMaterials += 50;
      adjustments.push("Visible damage to be confirmed");
    }
  }

  else if (formData.projectType === "plumbing_replace_toilet") {
    const cfg = PRICING.plumbing.toilet;

    laborMin += cfg.baseLaborMin;
    laborMax += cfg.baseLaborMax;
    hours += cfg.hours;
    minMaterials += 25;
    maxMaterials += 60;
    materialsList = cfg.materials;
    adjustments.push("Base toilet replacement");

    if (formData.plumbingHasFixture === "no") {
      minMaterials += cfg.fixtureAllowanceMin;
      maxMaterials += cfg.fixtureAllowanceMax;
      adjustments.push("Toilet fixture allowance included");
    } else if (formData.plumbingHasFixture === "notSure") {
      minMaterials += 60;
      maxMaterials += 140;
      adjustments.push("Fixture allowance may be needed");
    }

    const floorAdj = cfg.floorIssue[formData.plumbingFloorIssue] || cfg.floorIssue.notSure;
    laborMin += floorAdj.laborMin;
    laborMax += floorAdj.laborMax;
    minMaterials += floorAdj.matMin;
    maxMaterials += floorAdj.matMax;
    if (formData.plumbingFloorIssue !== "no") {
      adjustments.push("Floor condition adjustment");
    }

    const looseAdj = cfg.loose[formData.plumbingLoose] || cfg.loose.notSure;
    laborMin += looseAdj.laborMin;
    laborMax += looseAdj.laborMax;
    if (formData.plumbingLoose !== "no") {
      adjustments.push("Loose / rocking toilet adjustment");
    }

    const accessAdj = cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure;
    laborMin += accessAdj.laborMin;
    laborMax += accessAdj.laborMax;
    if (formData.plumbingAccessDifficulty !== "easy") {
      adjustments.push("Access difficulty adjustment");
    }

    if (formData.plumbingRepairScope === "includeRepairsIfNeeded") {
      laborMin += 60;
      laborMax += 140;
      minMaterials += 20;
      maxMaterials += 60;
      adjustments.push("Surrounding repairs allowed if needed");
    }

    if (formData.plumbingSeverity === "active") {
      laborMin += 80;
      laborMax += 160;
      adjustments.push("Active issue adjustment");
    } else if (formData.plumbingSeverity === "damage") {
      laborMin += 50;
      laborMax += 110;
      adjustments.push("Possible surrounding damage");
    }
  }

  else if (formData.projectType === "plumbing_replace_vanity") {
    const cfg = PRICING.plumbing.vanity;

    laborMin += cfg.baseLaborMin;
    laborMax += cfg.baseLaborMax;
    hours += cfg.hours;
    minMaterials += 35;
    maxMaterials += 90;
    materialsList = cfg.materials;
    adjustments.push("Base vanity replacement");

    if (formData.plumbingHasFixture === "no") {
      minMaterials += cfg.fixtureAllowanceMin;
      maxMaterials += cfg.fixtureAllowanceMax;
      adjustments.push("Vanity allowance included");
    } else if (formData.plumbingHasFixture === "notSure") {
      minMaterials += 80;
      maxMaterials += 180;
      adjustments.push("Vanity allowance may be needed");
    }

    const sameSizeAdj = cfg.sameSize[formData.plumbingSameSize] || cfg.sameSize.notSure;
    laborMin += sameSizeAdj.laborMin;
    laborMax += sameSizeAdj.laborMax;
    if (formData.plumbingSameSize !== "yes") {
      adjustments.push("Size / fit adjustment");
    }

    const touchAdj = cfg.touchup[formData.plumbingFinishTouchup] || cfg.touchup.notSure;
    laborMin += touchAdj.laborMin;
    laborMax += touchAdj.laborMax;
    if (formData.plumbingFinishTouchup !== "no") {
      adjustments.push("Finish touch-up adjustment");
    }

    const leakAdj = cfg.leakDamage[formData.plumbingLeakDamage] || cfg.leakDamage.notSure;
    laborMin += leakAdj.laborMin;
    laborMax += leakAdj.laborMax;
    minMaterials += leakAdj.matMin;
    maxMaterials += leakAdj.matMax;
    if (formData.plumbingLeakDamage !== "no") {
      adjustments.push("Leak / water damage adjustment");
    }

    if (formData.plumbingScope === "includeRelatedPlumbing") {
      laborMin += 70;
      laborMax += 150;
      minMaterials += 20;
      maxMaterials += 50;
      adjustments.push("Related plumbing components allowed");
    }

    if (formData.plumbingIncluded === "vanityTop") {
      laborMin += 40;
      laborMax += 80;
      adjustments.push("Vanity with top");
    } else if (formData.plumbingIncluded === "vanityTopFaucet") {
      laborMin += 90;
      laborMax += 180;
      adjustments.push("Vanity with top and faucet");
    }
  }

  else if (formData.projectType === "plumbing_replace_garbage_disposal") {
    const cfg = PRICING.plumbing.garbageDisposal;

    laborMin += cfg.baseLaborMin;
    laborMax += cfg.baseLaborMax;
    hours += cfg.hours;
    minMaterials += 20;
    maxMaterials += 50;
    materialsList = cfg.materials;
    adjustments.push("Base garbage disposal replacement");

    if (formData.plumbingHasFixture === "no") {
      minMaterials += cfg.fixtureAllowanceMin;
      maxMaterials += cfg.fixtureAllowanceMax;
      adjustments.push("Garbage disposal allowance included");
    } else if (formData.plumbingHasFixture === "notSure") {
      minMaterials += 60;
      maxMaterials += 140;
      adjustments.push("Fixture allowance may be needed");
    }

    const areaAdj = cfg.areaDamage[formData.plumbingAreaDamage] || cfg.areaDamage.notSure;
    laborMin += areaAdj.laborMin;
    laborMax += areaAdj.laborMax;
    if (formData.plumbingAreaDamage !== "no") {
      adjustments.push("Sink area damage adjustment");
    }

    const powerAdj = cfg.powerReady[formData.plumbingPowerReady] || cfg.powerReady.notSure;
    laborMin += powerAdj.laborMin;
    laborMax += powerAdj.laborMax;
    minMaterials += powerAdj.matMin;
    maxMaterials += powerAdj.matMax;
    if (formData.plumbingPowerReady !== "yes") {
      adjustments.push("Power readiness adjustment");
    }

    const accessAdj = cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure;
    laborMin += accessAdj.laborMin;
    laborMax += accessAdj.laborMax;
    if (formData.plumbingAccessDifficulty !== "easy") {
      adjustments.push("Access difficulty adjustment");
    }

    if (formData.plumbingScope === "includeSinkAreaIssuesIfNeeded") {
      laborMin += 60;
      laborMax += 130;
      minMaterials += 15;
      maxMaterials += 40;
      adjustments.push("Sink-area issues allowed if needed");
    }
  }

  else if (formData.projectType === "plumbing_replace_shutoff_valves") {
    const cfg = PRICING.plumbing.shutoff;
    const valveCount = formData.plumbingValveCount === "4plus" ? 4 : parseInt(formData.plumbingValveCount || "1", 10);

    let laborMultiplier = 1;
    if (valveCount === 2) {
      laborMultiplier = 1 + cfg.secondValveMultiplier;
    } else if (valveCount >= 3) {
      laborMultiplier = 1 + cfg.secondValveMultiplier + ((valveCount - 2) * cfg.extraValveMultiplier);
    }

    laborMin += cfg.baseOneLaborMin * laborMultiplier;
    laborMax += cfg.baseOneLaborMax * laborMultiplier;
    hours += 1.5 * laborMultiplier;
    minMaterials += cfg.baseMatMin * valveCount;
    maxMaterials += cfg.baseMatMax * valveCount;
    materialsList = cfg.materials;
    adjustments.push(`Base shutoff valve replacement for ${valveCount} valve(s)`);

    const accessAdj = cfg.access[formData.plumbingValveAccess] || cfg.access.moderate;
    laborMin += accessAdj.laborMin;
    laborMax += accessAdj.laborMax;
    if (formData.plumbingValveAccess !== "easy") {
      adjustments.push("Valve access adjustment");
    }

    const condAdj = cfg.condition[formData.plumbingValveCondition] || cfg.condition.notSure;
    laborMin += condAdj.laborMin;
    laborMax += condAdj.laborMax;
    if (formData.plumbingValveCondition !== "normal") {
      adjustments.push("Valve condition adjustment");
    }

    if (formData.plumbingValvePartOfOtherProject === "yes") {
      laborMin -= 40;
      laborMax -= 40;
      adjustments.push("Bundled with another plumbing project");
    }

    if (formData.plumbingScope === "includeNearbyIssuesIfNeeded") {
      laborMin += 50;
      laborMax += 120;
      minMaterials += 10;
      maxMaterials += 35;
      adjustments.push("Nearby plumbing issues allowed if needed");
    }
  }

  else if (formData.projectType === "plumbing_fix_active_leak") {
    const cfg = PRICING.plumbing.leak;
    const accessType = (cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure).type;

    if (accessType === "accessible") {
      laborMin += cfg.accessibleLaborMin;
      laborMax += cfg.accessibleLaborMax;
      minMaterials += cfg.accessibleMatMin;
      maxMaterials += cfg.accessibleMatMax;
      hours += cfg.accessibleHours;
      adjustments.push("Accessible leak repair base");
    } else {
      laborMin += cfg.behindWallLaborMin;
      laborMax += cfg.behindWallLaborMax;
      minMaterials += cfg.behindWallMatMin;
      maxMaterials += cfg.behindWallMatMax;
      hours += cfg.behindWallHours;
      adjustments.push("Concealed / behind-wall leak base");
    }

    const accessAdj = cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure;
    laborMin += accessAdj.laborMin || 0;
    laborMax += accessAdj.laborMax || 0;

    const durationAdj = cfg.duration[formData.plumbingLeakDuration] || cfg.duration.notSure;
    laborMin += durationAdj.laborMin;
    laborMax += durationAdj.laborMax;
    if (formData.plumbingLeakDuration !== "today") {
      adjustments.push("Leak duration adjustment");
    }

    const surfAdj = cfg.affectedSurfaces[formData.plumbingAffectedSurfaces] || cfg.affectedSurfaces.notSure;
    laborMin += surfAdj.laborMin;
    laborMax += surfAdj.laborMax;
    if (formData.plumbingAffectedSurfaces !== "no") {
      adjustments.push("Affected surfaces adjustment");
    }

    const dmgAdj = cfg.damageSigns[formData.plumbingDamageSigns] || cfg.damageSigns.notSure;
    laborMin += dmgAdj.laborMin;
    laborMax += dmgAdj.laborMax;
    if (formData.plumbingDamageSigns !== "no") {
      adjustments.push("Damage signs adjustment");
    }

    const openAdj = cfg.openAccessWork[formData.plumbingOpenAccessWork] || cfg.openAccessWork.notSure;
    laborMin += openAdj.laborMin;
    laborMax += openAdj.laborMax;
    if (formData.plumbingOpenAccessWork !== "no") {
      adjustments.push("Opening / access work allowed");
    }

    const repairAdj = cfg.repairAfterStop[formData.plumbingRepairAfterStop] || cfg.repairAfterStop.notSure;
    laborMin += repairAdj.laborMin;
    laborMax += repairAdj.laborMax;
    if (formData.plumbingRepairAfterStop !== "no") {
      adjustments.push("Post-leak repairs allowed");
    }
  }

  else if (formData.projectType === "plumbing_install_new_fixture") {
    const cfg = PRICING.plumbing.newFixture;

    laborMin += cfg.baseLaborMin;
    laborMax += cfg.baseLaborMax;
    hours += cfg.hours;
    minMaterials += 30;
    maxMaterials += 80;
    materialsList = cfg.materials;
    adjustments.push("Base new plumbing fixture installation");

    if (formData.plumbingHasFixture === "no") {
      minMaterials += cfg.fixtureAllowanceMin;
      maxMaterials += cfg.fixtureAllowanceMax;
      adjustments.push("Fixture allowance included");
    } else if (formData.plumbingHasFixture === "notSure") {
      minMaterials += 40;
      maxMaterials += 100;
      adjustments.push("Fixture allowance may be needed");
    }

    const supplyAdj = cfg.supplyAvailable[formData.plumbingSupplyAvailable] || cfg.supplyAvailable.notSure;
    laborMin += supplyAdj.laborMin;
    laborMax += supplyAdj.laborMax;
    if (formData.plumbingSupplyAvailable !== "yes") {
      adjustments.push("Water supply adjustment");
    }

    const drainAdj = cfg.drainAvailable[formData.plumbingDrainAvailable] || cfg.drainAvailable.notSure;
    laborMin += drainAdj.laborMin;
    laborMax += drainAdj.laborMax;
    if (formData.plumbingDrainAvailable !== "yes") {
      adjustments.push("Drain line adjustment");
    }

    const openingAdj = cfg.openingNeeded[formData.plumbingOpeningNeeded] || cfg.openingNeeded.notSure;
    laborMin += openingAdj.laborMin;
    laborMax += openingAdj.laborMax;
    if (formData.plumbingOpeningNeeded !== "no") {
      adjustments.push("Opening work adjustment");
    }

    const accessAdj = cfg.access[formData.plumbingAccessDifficulty] || cfg.access.notSure;
    laborMin += accessAdj.laborMin;
    laborMax += accessAdj.laborMax;
    if (formData.plumbingAccessDifficulty !== "easy") {
      adjustments.push("Access difficulty adjustment");
    }

    const repairAdj = cfg.repairScope[formData.plumbingRepairScope] || cfg.repairScope.installOnly;
    laborMin += repairAdj.laborMin;
    laborMax += repairAdj.laborMax;
    if (formData.plumbingRepairScope === "includeFinishRepairsIfNeeded") {
      adjustments.push("Finish repairs allowed if needed");
    }

    if (formData.plumbingSeverity === "openingLikelyNeeded") {
      laborMin += 70;
      laborMax += 140;
      adjustments.push("Likely opening / layout complexity");
    } else if (formData.plumbingSeverity === "somePlumbingNeeded") {
      laborMin += 50;
      laborMax += 110;
      adjustments.push("Some new plumbing work needed");
    }

    if (formData.plumbingFixtureType) {
      adjustments.push(`Fixture type: ${formData.plumbingFixtureType}`);
    }
  }

  minMaterials = Math.max(0, minMaterials);
  maxMaterials = Math.max(minMaterials, maxMaterials);
  laborMin = Math.max(0, laborMin);
  laborMax = Math.max(laborMin, laborMax);

  const totalMin = minMaterials + laborMin;
  const totalMax = maxMaterials + laborMax;

  return applyMarketAndPropertyAdjustments(
    {
      hours: Math.round(hours * 10) / 10,
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
startNewFromHot.addEventListener("click", resetExperience);
startNewFromDone.addEventListener("click", resetExperience);

const startNewFromPayment = document.getElementById("startNewFromPayment");
if (startNewFromPayment) {
  startNewFromPayment.addEventListener("click", resetExperience);
}

updateDrywallContextUI();
updateLightingConditionalFields();
updatePaintConditionalFields();
updatePlumbingConditionalUI();
updatePropertyTypeMessage();
hideAllEndStates();
showStep(1);
