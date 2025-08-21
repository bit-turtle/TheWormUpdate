scoreboard players add @s worm_timer 1
execute if score @s worm_timer matches 1200.. run function worm/burrow
execute if score @s worm_timer matches 1200.. run scoreboard players set @s worm_timer 0