"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertLength = convertLength;
function convertLength(measure, inputUnit, outputUnit) {
    const toMeters = {
        mm: 0.001,
        cm: 0.01,
        m: 1,
        km: 1000,
        in: 0.0254,
        ft: 0.3048,
        yd: 0.9144,
        mi: 1609.344,
    };
    const measureInMeters = measure * toMeters[inputUnit];
    const result = measureInMeters / toMeters[outputUnit];
    return result;
}
