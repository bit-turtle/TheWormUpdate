# Convert worm block into normal block
execute if block ~ ~ ~ worm:grass_block_with_worm run setblock ~ ~ ~ grass_block
execute if block ~ ~ ~ worm:dirt_with_worm run setblock ~ ~ ~ dirt
execute if block ~ ~ ~ worm:mycelium_with_worm run setblock ~ ~ ~ mycelium
execute if block ~ ~ ~ worm:podzol_with_worm run setblock ~ ~ ~ podzol