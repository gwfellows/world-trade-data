import pandas as pd
d = pd.read_csv('./tradeconnectivity/data.csv')
d = d[d["L3"] == "000"] #only for all items

'''
need to make table
source_lat
source_lon
dest_lat
dest_lon
current_lat      starts at source lat
current_lon     starts at source_lon
k_factor          starts at 0
step                proportional to trade volume
'''

cd = pd.read_csv('./tradeconnectivity/other_economy.csv')

def country_code_to_name(code):
    return cd[cd['Partner'] == code]['PartnerName'].to_list()[0]

ld = pd.read_csv('./countries_center_box-master/countries.csv')
ld = ld.reindex()
#ld = pd.concat([pd.DataFrame([['a','b','c','d','e','f','g','h','i']], columns=ld.columns), ld])
print(ld)

def country_code_to_coords(code):
    lat = ld[ld['1'] == country_code_to_name(code) ]['3'].to_list()[0]
    lon = ld[ld['1'] == country_code_to_name(code) ]['4'].to_list()[0]
    return lat, lon
    
for i, row in d.iterrows():
    source_country_code = row['Reporter']
    dest_country_code = row['Partner']
    exports_from_source_to_dest = float(row['Ind2'])*float(row['Reporter_Total_Exports'])
    
    source_lat, source_lon = country_code_to_coords(source_country_code)
    dest_lat, dest_lon = country_code_to_coords(dest_country_code)
    current_lat, current_lon = source_lat, source_lon
    k_factor = 0
    step = exports_from_source_to_dest/(300*10**9)
    print(step)
