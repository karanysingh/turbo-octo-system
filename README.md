# turbo-octo-system
Ringover Full Stack Assignment - Backend


# Instructions to run
### Run the database  
`tiup playground` or `tiup -T {tagname} playground` 

### Connect SQL client (new terminal window)
- `mysql --local-infile --host 127.0.0.1 --port 4000 -u root -p --comments`
- Load data from csv using `source {location of project}\migration\local_load.sql` in sql client.

### Run backend (new terminal window)
- `npm install` (for first run)
- `npm run dev`

### Run Frontend
- `npm install` (for first run) 
- `npm run dev`

# Screenshots
- Home
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/56989043/204463930-d9a1777b-8acb-4702-b522-ddc460d3c90e.png">

- Heatmap  
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/56989043/204463693-16261970-8d3d-4e1a-9400-c81b63627a41.png">

- Graph 
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/56989043/204463789-1c02b413-3a24-4f42-ac61-0dcc41bc851f.png">

- Tables
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/56989043/204463845-64be82d3-59dc-4508-b048-67277ff08a3b.png">
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/56989043/204463879-d78ff4d9-c806-4184-bd37-ef558c1c73c0.png">

### API

- input: clubnames (separated by commas no space)
<img width="698" alt="image" src="https://user-images.githubusercontent.com/56989043/204464416-0e23cd02-685a-407c-963e-f558df5ffb1d.png">

- input: nil
<img width="699" alt="image" src="https://user-images.githubusercontent.com/56989043/204464538-a6f6429a-dadc-4f30-9281-9658b6c85482.png">

- input: clubname and type
<img width="705" alt="image" src="https://user-images.githubusercontent.com/56989043/204464890-b9811859-44a8-4746-8ca3-ad8e655be429.png">

- input: clubnames and position
<img width="709" alt="image" src="https://user-images.githubusercontent.com/56989043/204465199-1497f40f-5c87-4dda-81ee-6341d699d4e1.png">

- input: playername
<img width="716" alt="image" src="https://user-images.githubusercontent.com/56989043/204465619-94ce95c8-d66e-468f-97f1-f7d11fe0d87a.png">


