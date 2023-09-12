const missions = [
    {
        name: "Journey to the Moon",
        dialogue: "Travel to the moon aboard your spaceship.",
        pointsRequired: 375000,
        type: "Distance",
        leftIcon: "icons/ico_earth_1.svg",  // Path to your SVG icon
        rightIcon: "icons/ico_moon_1.svg",  // Path to your SVG icon
        completed: false,
        dialogues: [
            {
                pointsThreshold: 10,
                message: "Launch sequence initiated."
            },
            {
                pointsThreshold: 100,
                message: "Approaching Max Q."
            },
            {
                pointsThreshold: 200,
                message: "Booster separation successful."
            },
            {
                pointsThreshold: 300,
                message: "Exiting Earth's atmosphere."
            },
            {
                pointsThreshold: 400,
                message: "Entering low Earth orbit."
            },
            {
                pointsThreshold: 600,
                message: "Main engine cut-off confirmed."
            },
            {
                pointsThreshold: 700,
                message: "Calibrating flight path."
            },
            {
                pointsThreshold: 800,
                message: "Executing trans-lunar injection burn."
            },
            {
                pointsThreshold: 1200,
                message: "Burn successful. Orbital stabililzers activated."
            },
            {
                pointsThreshold: 2000,
                message: "Autopilot systems engaged. Maintaining designated flight path."
            },
            {
                pointsThreshold: 75000,
                message: "Congratulations on completing your first task!"
            },
            {
                pointsThreshold: 75010,
                message: "Fuel levels within optimal parameters. Consumption rate stable."
            },
            {
                pointsThreshold: 100000,
                message: "Distance milestone: 100,000 km from earth."
            },
            {
                pointsThreshold: 125000,
                message: "Cabin pressure and humidity levels maintained for crew comfort and safety."
            },
            {
                pointsThreshold: 150000,
                message: "Second task completed. Great work!"
            },
            {
                pointsThreshold: 150010,
                message: "Propulsion systems operating at 98% efficiency."
            },
            {
                pointsThreshold: 175000,
                message: "Communication links with Earth are strong and stable. No disruptions detected."
            },
            {
                pointsThreshold: 200000,
                message: "Distance milestone: 200,000 km from earth."
            },
            {
                pointsThreshold: 225000,
                message: "Third task complete. More than halfway there!"
            },
            {
                pointsThreshold: 225010,
                message: "Stellar navigation systems aligned. Moon's current position verified."
            },
            {
                pointsThreshold: 250000,
                message: "Oxygen and life support systems functioning at 100% efficiency."
            },
            {
                pointsThreshold: 275000,
                message: "External radiation levels within safe limits."
            },
            {
                pointsThreshold: 300000,
                message: "Almost there. Just one task left before landing on the moon."
            },
            {
                pointsThreshold: 300010,
                message: "Propulsion systems stable. Thrusters operating at expected efficiency."
            },
            {
                pointsThreshold: 325000,
                message: "Orbital correction maneuvers executed successfully. On target for lunar approach."
            },
            {
                pointsThreshold: 350000,
                message: "Lunar gravitational pull detected. Adjusting trajectory for smooth lunar orbit insertion."
            },
            {
                pointsThreshold: 360000,
                message: "Entering lunar orbit."
            },
            {
                pointsThreshold: 365000,
                message: "Lunar landmarks coming into view. Preparing for detailed surface scans."
            },
            {
                pointsThreshold: 370000,
                message: "Landing coordinates confirmed. Begginning final descent."
            }
          
        ],
    },
    {
        name: "Build a base on the moon",
        dialogue: "Build a moon base",
        pointsRequired: 10,
        type: "Construction",
        completed: false,
        dialogues: [
            {
                pointsThreshold: 50000,
                message: "You're off to a good start!"
            },
            {
                pointsThreshold: 200000,
                message: "Almost there! Keep it up!"
            },
            {
                pointsThreshold: 350000,
                message: "You're approaching the Moon!"
            }
        ],
    }
    // ... other missions can be added here
];

export { missions };
