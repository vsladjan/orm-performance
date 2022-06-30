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
exports.Equipment = void 0;
const typeorm_1 = require("typeorm");
const Player_1 = require("./Player");
let Equipment = class Equipment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Equipment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "name", length: 255 }),
    __metadata("design:type", String)
], Equipment.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "description", nullable: true, length: 255 }),
    __metadata("design:type", String)
], Equipment.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "color", nullable: true, length: 255 }),
    __metadata("design:type", String)
], Equipment.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Player_1.Player, (player) => player.equipment),
    __metadata("design:type", Array)
], Equipment.prototype, "players", void 0);
Equipment = __decorate([
    (0, typeorm_1.Entity)("equipment", { schema: "orm" })
], Equipment);
exports.Equipment = Equipment;
//# sourceMappingURL=Equipment.js.map