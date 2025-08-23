import { world, system } from "@minecraft/server";

const normal = new Map();
normal.set("worm:grass_block_with_worm", "minecraft:grass_block");
normal.set("worm:dirt_with_worm", "minecraft:dirt");
normal.set("worm:mycelium_with_worm", "minecraft:mycelium");
normal.set("worm:podzol_with_worm", "minecraft:podzol");

const worm = new Map();
worm.set("minecraft:grass_block", "worm:grass_block_with_worm");
worm.set("minecraft:dirt", "worm:dirt_with_worm");
worm.set("minecraft:mycelium", "worm:mycelium_with_worm");
worm.set("minecraft:podzol", "worm:podzol_with_worm");

const blocks = new Set([
    "minecraft:grass_block",
    "minecraft:dirt",
    "minecraft:mycelium",
    "minecraft:podzol"
]);

// Worm Block custom component
/** @type {import("@minecraft/server").BlockCustomComponent} */
const WormBlock = {
    // Worm leaves block when broken
    onPlayerBreak(event) {
        let location = event.block.location;
        location.x += 0.5;
        location.z += 0.5;
        event.block.dimension.spawnEntity("worm:worm", location);
    },
    // Worm block moves randomly
    onRandomTick(event) {
        // Choose target locaton
        let location = event.block.location;
        let axis = Math.floor(Math.random() * 3);
        let direction = Math.round(Math.random()) * 2 - 1;
        if (axis == 0) location.x += direction;
        else if (axis == 1) location.y += direction;
        else location.z += direction;
        // Try to move
        let type = event.dimension.getBlock(location).type;
        if (blocks.has(type)) {
            event.dimension.setBlockType(location, worm.get(type));
            event.block.setType(normal.get(event.block.type));
        }
    }
};

// Add custom worm block component
system.beforeEvents.startup.subscribe(
    ({ blockComponentRegistry }) => {
        blockComponentRegistry.registerCustomComponent(
            "worm:worm_block",
            WormBlock
        );
    }
);