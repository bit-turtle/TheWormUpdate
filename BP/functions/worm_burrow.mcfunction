# Attempt to burrow
execute if block ~ ~-1 ~ grass_block run setblock ~ ~-1 ~ worm:grass_block_with_worm
execute if block ~ ~-1 ~ dirt run setblock ~ ~-1 ~ worm:dirt_with_worm
execute if block ~ ~-1 ~ mycelium run setblock ~ ~-1 ~ worm:mycelium_with_worm
execute if block ~ ~-1 ~ podzol run setblock ~ ~-1 ~ worm:podzol_with_worm
# Destroy worm if burrow was successful
execute if block ~ ~-1 ~ worm:grass_block_with_worm run function worm_destroy
execute if block ~ ~-1 ~ worm:dirt_with_worm run function worm_destroy
execute if block ~ ~-1 ~ worm:mycelium_with_worm run function worm_destroy
execute if block ~ ~-1 ~ worm:podzol_with_worm run function worm_destroy