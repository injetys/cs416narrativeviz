// Function to read and parse CSV data
function parseCSVData(csvData) {
    const rows = csvData.split("\n").slice(1); // Skipping the header row
    const rowData = rows.map(row => row.split(","));
    return rowData;
}

// Function to count the rows in the dataset
function countRows(csvData) {
    return csvData.length;
}

// Function to display the row count on the HTML page
function displayRowCount(rowCount) {
    const rowCountElement = document.getElementById("row-count");
    rowCountElement.textContent = `Row Count: ${rowCount}`;
}

// Sample CSV data (replace this with your actual CSV data)
const csvData = `player_id,player_url,fifa_version,fifa_update,fifa_update_date,short_name,long_name,player_positions,overall,potential,value_eur,wage_eur,age,dob,height_cm,weight_kg,league_id,league_name,league_level,club_team_id,club_name,club_position,club_jersey_number,club_loaned_from,club_joined_date,club_contract_valid_until_year,nationality_id,nationality_name,nation_team_id,nation_position,nation_jersey_number,preferred_foot,weak_foot,skill_moves,international_reputation,work_rate,body_type,real_face,release_clause_eur,player_tags,player_traits,pace,shooting,passing,dribbling,defending,physic,attacking_crossing,attacking_finishing,attacking_heading_accuracy,attacking_short_passing,attacking_volleys,skill_dribbling,skill_curve,skill_fk_accuracy,skill_long_passing,skill_ball_control,movement_acceleration,movement_sprint_speed,movement_agility,movement_reactions,movement_balance,power_shot_power,power_jumping,power_stamina,power_strength,power_long_shots,mentality_aggression,mentality_interceptions,mentality_positioning,mentality_vision,mentality_penalties,mentality_composure,defending_marking_awareness,defending_standing_tackle,defending_sliding_tackle,goalkeeping_diving,goalkeeping_handling,goalkeeping_kicking,goalkeeping_positioning,goalkeeping_reflexes,goalkeeping_speed,ls,st,rs,lw,lf,cf,rf,rw,lam,cam,ram,lm,lcm,cm,rcm,rm,lwb,ldm,cdm,rdm,rwb,lb,lcb,cb,rcb,rb,gk,player_face_url\n227203,/player/227203/alexia-putellas-segura/230002,23,2,9/26/2022,Alexia Putellas,Alexia Putellas Segura,CM, LW,92,92,,28,2/4/1994,173,67,,,,,45,Spain,113012,LCM,14,Left,4,5,5,High/Medium,Normal (170-185),Yes,,#Dribbler, #Playmaker, #Crosser, #FK Specialist, #Clinical Finisher, #Complete Midfielder, #Complete Forward,Leadership, Flair, Outside Foot Shot, Team Player, Technical Dribbler (AI),80,90,92,91,72,75,87,94,74,95,90,93,89,89,91,94,82,78,76,95,78,81,75,90,75,90,58,79,96,95,91,91,60,82,64,15,17,11,15,10,,89+3,89+3,89+3,91,92,92,92,91,93-1,93-1,93-1,91+1,92,92,92,91+1,83+3,83+3,83+3,83+3,83+3,81+3,75+3,75+3,75+3,81+3,23+3,https://cdn.sofifa.net/players/227/203/23_120.png\n227125,/player/227125/sam-kerr/230002,23,2,9/26/2022,S. Kerr,Samantha May Kerr,ST,91,91,134500000,4000,28,9/10/1993,168,66,2216,Women's Super League,1,116010,Chelsea W,ST,20,,1/1/2020,2024,195,Australia,,Right,4,4,5,High/High,Normal (170-),Yes,275700000,#Aerial Threat, #Dribbler, #Engine, #Distance Shooter, #Acrobat, #Clinical Finisher, #Complete Forward,Solid Player, Leadership, Finesse Shot, Flair, Speed Dribbler (AI), Power Header, Outside Foot Shot,87,91,75,90,42,83,80,93,91,78,92,90,76,69,55,92,89,85,90,93,82,91,91,87,86,89,70,24,95,83,79,92,44,39,35,7,12,8,16,13,,91,91,91,88,90,90,90,88,87+3,87+3,87+3,86+3,77+3,77+3,77+3,86+3,66+3,61+3,61+3,61+3,66+3,63+3,59+3,59+3,59+3,63+3,21+3,https://cdn.sofifa.net/players/227/125/23_120.png\n227310,/player/227310/ada-hegerberg/230002,23,2,9/26/2022,A. Hegerberg,Ada Martine Stolsmo Hegerberg,ST,91,92,157000000,4000,26,7/10/1995,176,68,2218,Feminine Division 1,1,116033,Lyon W,ST,14,,7/1/2014,2024,36,Norway,113007,ST,14,Right,4,4,5,High/Medium,Normal (170-185),Yes,333600000,#Aerial Threat, #Distance Shooter, #Clinical Finisher, #
