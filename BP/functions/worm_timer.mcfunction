# Create Worm Timer
scoreboard objectives add worm_timer dummy "Worm Timer"
scoreboard players add @e[type=worm:worm] worm_timer 1
# Attempt to burrow if worm timer value is 1200 or above
execute as @e[type=worm:worm] at @s if score @s worm_timer matches 1200.. run function worm_burrow