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
exports.Player = void 0;
const core_1 = require("@mikro-orm/core");
const Club_1 = require("./Club");
const Equipment_1 = require("./Equipment");
let Player = class Player {
    constructor() {
        this.equipments = new core_1.Collection(this);
    }
};
__decorate([
    core_1.PrimaryKey(),
    __metadata("design:type", Number)
], Player.prototype, "id", void 0);
__decorate([
    core_1.Property({ length: 255 }),
    __metadata("design:type", String)
], Player.prototype, "name", void 0);
__decorate([
    core_1.Property({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Player.prototype, "lastname", void 0);
__decorate([
    core_1.Property({ nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "age", void 0);
__decorate([
    core_1.ManyToOne({ entity: () => Club_1.Club, fieldName: 'clubId', cascade: [core_1.Cascade.MERGE], nullable: true, index: 'clubId' }),
    __metadata("design:type", Club_1.Club)
], Player.prototype, "clubId", void 0);
__decorate([
    core_1.ManyToMany({ entity: () => Equipment_1.Equipment, pivotTable: 'PlayerEquipment', joinColumn: 'playerId', inverseJoinColumn: 'equipmentId' }),
    __metadata("design:type", Object)
], Player.prototype, "equipments", void 0);
Player = __decorate([
    core_1.Entity()
], Player);
exports.Player = Player;
//# sourceMappingURL=Player.js.map