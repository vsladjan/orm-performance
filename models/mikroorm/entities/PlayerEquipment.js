"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Playerequipment = void 0;
const core_1 = require("@mikro-orm/core");
const Equipment_1 = require("./Equipment");
const Player_1 = require("./Player");
let Playerequipment = class Playerequipment {
};
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Player_1.Player, fieldName: 'playerId', cascade: [core_1.Cascade.MERGE], primary: true }),
    __metadata("design:type", Player_1.Player)
], Playerequipment.prototype, "playerId", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Equipment_1.Equipment, fieldName: 'equipmentId', cascade: [core_1.Cascade.MERGE], primary: true, index: 'equipmentId' }),
    __metadata("design:type", Equipment_1.Equipment)
], Playerequipment.prototype, "equipmentId", void 0);
Playerequipment = __decorate([
    (0, core_1.Entity)()
], Playerequipment);
exports.Playerequipment = Playerequipment;
//# sourceMappingURL=PlayerEquipment.js.map