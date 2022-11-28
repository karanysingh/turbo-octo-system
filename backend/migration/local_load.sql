create database uefa;
use uefa;

create table players_info (player_id bigint auto_increment primary key, player_name varchar(40), club varchar(40));
create table attacking (player_id bigint, serial int, player_name varchar(40), club varchar(40), position varchar(40), assists int, corner_taken int, offsides int,dribbles int, match_played int);
create table defending (player_id bigint, serial int, player_name varchar(40), club varchar(40), position varchar(40), balls_recoverd int, tackles int, t_won int, t_lost int, clearance_attempted int, match_played int);
create table attempts (player_id bigint, serial int, player_name varchar(40), club varchar(40), position varchar(40), total_attempts int, on_target int, off_target int, blocked int, match_played int);
create table disciplinary (player_id bigint, serial int, player_name varchar(40), club varchar(40), position varchar(40), fouls_committed int, fouls_suffered int,red int, yellow int, minutes_played int, match_played int);
create table distribution (player_id bigint, serial int, player_name varchar(40), club varchar(40), position varchar(40), pass_accuracy float, pass_attempted int, pass_completed int, cross_accuracy int, cross_attempted int, cross_completed int);
create table goalkeeping (player_id bigint, serial int, player_name varchar(40), club varchar(40), position varchar(40), saved int, conceded int, saved_penalties int, cleansheets int, punches_made int, match_played int);
create table goals (player_id bigint, serial int, player_name varchar(40), club varchar(40), position varchar(40), goals int, right_foot int, left_foot int, headers int, others int, inside_area int);
create table key_stats (player_id bigint, player_name varchar(40), club varchar(40), position varchar(40), minutes_played int, match_played int, goals int, assists int, distance_covered int);

alter table players_info add column (first_name varchar(40));
alter table players_info add column (last_name varchar(40));

LOAD DATA LOCAL INFILE '~/Documents/Github/Ringover/backend/migration/UEFA.PLAYER_INFO.csv' INTO TABLE key_stats FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (player_name, club, position, minutes_played, match_played, goals, assists, distance_covered);
LOAD DATA LOCAL INFILE '~/Documents/Github/Ringover/backend/migration/UEFA.PLAYER_INFO.csv' INTO TABLE players_info FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (player_name, club);
LOAD DATA LOCAL INFILE '~/Documents/Github/Ringover/backend/migration/attacking.csv' INTO TABLE attacking FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (serial, player_name,club, position, assists, corner_taken, offsides, dribbles, match_played);
LOAD DATA LOCAL INFILE '~/Documents/Github/Ringover/backend/migration/defending.csv' INTO TABLE defending FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (serial, player_name, club, position, balls_recoverd, tackles, t_won, t_lost, clearance_attempted, match_played);
LOAD DATA LOCAL INFILE '~/Documents/Github/Ringover/backend/migration/attempts.csv' INTO TABLE attempts FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (serial, player_name, club, position, total_attempts, on_target, off_target, blocked, match_played);
LOAD DATA LOCAL INFILE '~/Documents/Github/Ringover/backend/migration/disciplinary.csv' INTO TABLE disciplinary FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (serial, player_name, club, position, fouls_committed, fouls_suffered, red, yellow, minutes_played, match_played);
LOAD DATA LOCAL INFILE '~/Documents/Github/Ringover/backend/migration/distributon.csv' INTO TABLE distribution FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (serial, player_name, club, position, pass_accuracy, pass_attempted, pass_completed, cross_accuracy, cross_attempted, cross_completed);
LOAD DATA LOCAL INFILE '~/Documents/Github/Ringover/backend/migration/goalkeeping.csv' INTO TABLE goalkeeping FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (serial, player_name, club, position, saved, conceded, saved_penalties, cleansheets, punches_made, match_played);
LOAD DATA LOCAL INFILE '~/Documents/Github/Ringover/backend/migration/goals.csv' INTO TABLE goals FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (serial, player_name, club, position, goals, right_foot, left_foot, headers, others, inside_area);

delete from players_info where player_name in (select player_name from players_info group by player_name having count(*)>1);

UPDATE attacking SET player_id = (SELECT player_id FROM players_info WHERE attacking.player_name = players_info.player_name);
UPDATE defending SET player_id = (SELECT player_id FROM players_info WHERE defending.player_name = players_info.player_name);
UPDATE attempts SET player_id = (SELECT player_id FROM players_info WHERE attempts.player_name = players_info.player_name);
UPDATE disciplinary SET player_id = (SELECT player_id FROM players_info WHERE disciplinary.player_name = players_info.player_name);
UPDATE distribution SET player_id = (SELECT player_id FROM players_info WHERE distribution.player_name = players_info.player_name);
UPDATE goalkeeping SET player_id = (SELECT player_id FROM players_info WHERE goalkeeping.player_name = players_info.player_name);
UPDATE goals SET player_id = (SELECT player_id FROM players_info WHERE goals.player_name = players_info.player_name);
UPDATE key_stats SET player_id = (SELECT player_id FROM players_info WHERE key_stats.player_name = players_info.player_name);

delete from attacking where player_id is null;
delete from defending where player_id is null;
delete from attempts where player_id is null;
delete from disciplinary where player_id is null;
delete from distribution where player_id is null;
delete from goalkeeping where player_id is null;
delete from goals where player_id is null;
delete from key_stats where player_id is null;

alter table defending add foreign key fk_id (player_id) references players_info(player_id);
alter table attacking add foreign key fk_id (player_id) references players_info(player_id);
alter table attempts add foreign key fk_id (player_id) references players_info(player_id);
alter table disciplinary add foreign key fk_id (player_id) references players_info(player_id);
alter table distribution add foreign key fk_id (player_id) references players_info(player_id); 
alter table goalkeeping add foreign key fk_id (player_id) references players_info(player_id);
alter table goals add foreign key fk_id (player_id) references players_info(player_id);
alter table key_stats add foreign key fk_id (player_id) references players_info(player_id);


update players_info set first_name = substring_index(player_name, ' ', 1);
update players_info set last_name = substring_index(player_name, ' ', -1) where player_name like '% %';
update players_info set last_name = "" where last_name is null;

alter table players_info drop column player_name;
alter table attacking drop column player_name;
alter table defending drop column player_name;
alter table attempts drop column player_name;
alter table disciplinary drop column player_name;
alter table distribution drop column player_name;
alter table goalkeeping drop column player_name;
alter table goals drop column player_name;

alter table attacking drop column serial;
alter table defending drop column serial;
alter table attempts drop column serial;
alter table disciplinary drop column serial;
alter table distribution drop column serial;
alter table goalkeeping drop column serial;
alter table goals drop column serial;

