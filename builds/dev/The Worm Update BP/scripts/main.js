import { world, system } from "@minecraft/server";

const blocks = new Set([
    "minecraft:grass_block",
    "minecraft:dirt",
    "minecraft:mycelium",
    "minecraft:podzol"
]);

// Worm Block custom component
/** @type {import("@minecraft/server").BlockCustomComponent} */
const WormBlock = {
    // Worm leaves block when broken without silk touch
    onPlayerBreak(event) {
        let silk_touch = 0;
        try {
            silk_touch = event.player
                .getComponent("minecraft:equippable")
                .getEquipmentSlot("Mainhand")
                .getItem()
                .getComponent("minecraft:enchantable")
                .getEnchantment("silk_touch")
                .value;
        } catch (e) { /* Errors just mean it doesn't have silk touch */ }
        if (silk_touch == 0) {
            event.block.dimension.spawnEntity(
                "worm:worm",
                {
                    x: event.block.location.x + 0.5,
                    y: event.block.location.y,
                    z: event.block.location.z + 0.5
                }
            );
        }
    },
    // Worm block moves randomly
    onRandomTick(event) {
        // Choose target locaton
        let block;
        let axis = Math.floor(Math.random() * 3);
        let direction = Math.round(Math.random()) * 2 - 1;
        try {
            if (axis == 0) block = event.block.above(direction);
            else if (axis == 1) block = event.block.north(direction);
            else if (axis == 2) block = event.block.west(direction);
        } catch (e) { return; }
        // Try to move
        if (blocks.has(block.type.id)) {
            event.block.dimension.runCommand(
                "execute positioned " + block.location.x + " " + block.location.y + " " + block.location.z + " " +
                "run function worm_block"
            );
            event.block.dimension.runCommand(
                "execute positioned " + event.block.location.x + " " + event.block.location.y + " " + event.block.location.z + " " +
                "run function worm_convert"
            );
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