import pandas as pd
d = pd.read_csv('./tradeconnectivity/data.csv')
d = d[d["L3"] == "000"] #only for all items

'''
need to make table
a) source_lat
b) source_lon
c) dest_lat
d) dest_lon
e) current_lat      starts at source lat
f) current_lon     starts at source_lon
g) k_factor          starts at 0
h) step                proportional to trade volume
'''

cd = pd.read_csv('./tradeconnectivity/other_economy.csv')

def country_code_to_name(code):
    return cd[cd['Partner'] == code]['PartnerName'].to_list()[0]

ld = pd.read_csv('./countries_center_box-master/countries.csv')
ld = ld.reindex()
#ld = pd.concat([pd.DataFrame([['a','b','c','d','e','f','g','h','i']], columns=ld.columns), ld])
#print(ld)

# i am stupid
replacements = {
    'Bahrain, Kingdom of': 'Bahrain',
    'Bosnia & Herzegovina': 'Serbia', #sorry
    'Brunei Darussalam': 'Brunei',
    'Myanmar': 'Bangladesh', # i promise i will fix this later
    'Taipei, Chinese': 'Taiwan',
    'Congo (DRC)': 'Congo', # sorry
    'Dominican Republic': 'Dominica', #look it's not my fault the data is incomplete, ok
    'Hong Kong, China': 'China', # i said i will fix it
    'Côte d\'Ivoire': 'Liberia', #oops
    'Korea, Republic of': 'South Korea',
    'Kuwait, the State of': 'Kuwait',
    'Kyrgyz Republic': 'Kyrgyzstan',
    'Lao PDR': 'Laos',
    'Lebanese Republic': 'Lebanon',
    'Macao, China': 'China', # fix this
    'Moldova, Republic of': 'Moldova',
    'Netherlands': 'The Netherlands',
    'Russian Federation': 'Russia',
    'Saudi Arabia, Kingdom of':'Saudi Arabia',
    'Slovak Republic':'Slovakia',
    'Viet Nam':'Vietnam',
    'Trinidad and Tobago':'Grenada', #oops
    'United Arab Emirates':'Iran', #oops
    'North Macedonia':'Greece', #to fix
    'USA': 'United States',
    'Zambia': 'Zambia',
    'Antigua and Barbuda': 'Antigua',
    'Bahamas': 'The Bahamas',
    'Cabo Verde': 'Cape Verde',
    'Central African Republic': 'Chad', # fix!
    'Saint Kitts and Nevis': 'Cuba', # fix!
    'Saint Vincent and the Grenadines': 'Grenada', #fix
    'Sao Tomé and Principe': 'Seychelles', #fix
    'Eswatini':'Swaziland',
}

def country_code_to_coords(code):
    n = replacements.get(country_code_to_name(code), country_code_to_name(code))
    lat = ld[ld['1'] == n ]['3'].to_list()[0]
    lon = ld[ld['1'] == n ]['4'].to_list()[0]
    return lat, lon
    
a = []
b = []
c = []
d_ = []
e = []
f = []
g = []
h = []

for i, row in d.iterrows():
    source_country_code = row['Reporter']
    dest_country_code = row['Partner']
    exports_from_source_to_dest = float(row['Ind2'])*float(row['Reporter_Total_Exports'])
    
    #i want only counties, not regions
    if source_country_code[0] != 'C':
        continue
    if dest_country_code[0] != 'C':
        continue
        
    #print(source_country_code)
    #print(dest_country_code)
    #print(country_code_to_name(source_country_code))
    #print(country_code_to_name(dest_country_code))
    
    source_lat, source_lon = country_code_to_coords(source_country_code)
    dest_lat, dest_lon = country_code_to_coords(dest_country_code)
    current_lat, current_lon = source_lat, source_lon
    k_factor = 0
    step = exports_from_source_to_dest/(300*10**9)
    
    a.append(source_lat)
    b.append(source_lon)
    c.append(dest_lat)
    d_.append(dest_lon)
    e.append(current_lat)
    f.append(current_lon)
    g.append(k_factor)
    h.append(step)
    #print(step)
import json
with open("data_file.json", "w") as write_file:
    json.dump({'a':a, 'b':b, 'c':c, 'd':d_, 'e':e, 'f':f, 'g':g, 'h':h}, write_file)
'''
print(a)
print(b)
print(c)
print(d_)
print(e)
print(f)
print(g)
print(h)'''
