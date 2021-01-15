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
const typeorm_1 = require("typeorm");
const Club_1 = require("./Club");
const Equipment_1 = require("./Equipment");
let Player = class Player {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Player.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "name", length: 255 }),
    __metadata("design:type", String)
], Player.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "lastname", nullable: true, length: 255 }),
    __metadata("design:type", String)
], Player.prototype, "lastname", void 0);
__decorate([
    typeorm_1.Column("int", { name: "age", nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "age", void 0);
__decorate([
    typeorm_1.Column("int", { name: "clubId", nullable: true }),
    __metadata("design:type", Number)
], Player.prototype, "clubId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Club_1.Club, (club) => club.players, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    typeorm_1.JoinColumn([{ name: "clubId", referencedColumnName: "id" }]),
    __metadata("design:type", Club_1.Club)
], Player.prototype, "club", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Equipment_1.Equipment, (equipment) => equipment.players),
    typeorm_1.JoinTable({
        name: "playerequipment",
        joinColumns: [{ name: "playerId", referencedColumnName: "id" }],
        inverseJoinColumns: [{ name: "equipmentId", referencedColumnName: "id" }],
        schema: "orm",
    }),
    __metadata("design:type", Array)
], Player.prototype, "equipment", void 0);
Player = __decorate([
    typeorm_1.Index("clubId", ["clubId"], {}),
    typeorm_1.Entity("player", { schema: "orm" })
], Player);
exports.Player = Player;
//# sourceMappingURL=Player.js.map