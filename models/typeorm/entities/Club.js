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
exports.Club = void 0;
const typeorm_1 = require("typeorm");
const Player_1 = require("./Player");
let Club = class Club {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Club.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "name", length: 255 }),
    __metadata("design:type", String)
], Club.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "location", nullable: true, length: 255 }),
    __metadata("design:type", String)
], Club.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "created", nullable: true }),
    __metadata("design:type", Number)
], Club.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Player_1.Player, (player) => player.club),
    __metadata("design:type", Array)
], Club.prototype, "players", void 0);
Club = __decorate([
    (0, typeorm_1.Entity)("club", { schema: "orm" })
], Club);
exports.Club = Club;
//# sourceMappingURL=Club.js.map