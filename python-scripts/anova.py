import pandas as pd
import json
import matplotlib.pyplot as plt
import matplotlib.mlab as mlab
import scipy.stats as stats
import numpy as np
from scipy.signal.windows import tukey
from scipy.stats import tukey_hsd
from statsmodels.stats.multicomp import pairwise_tukeyhsd

keyword = "responseTime"
p_value = 0

def get_file(file):
    with open(file, 'r') as f:
        data = json.load(f)

    if keyword != "memoryUse" and keyword != "responseTime":
        print(f'Keyword {keyword} not found, use "memoryUse" or "responseTime"')

    report = [ex[keyword] for ex in data]

    return report

sql_times = get_file('Reports/test-report-SQL-get-advanced-1000-00-53-38.json')
prisma_times = get_file('./Reports/test-report-Prisma-get-advanced-1000-00-54-33.json')
sequelize_times = get_file('./Reports/test-report-Sequelize-get-advanced-1000-00-54-06.json')

print(f'Loaded {len(sql_times)} pure-SQL results')
print(f'Loaded {len(prisma_times)} Prisma results')
print(f'Loaded {len(sequelize_times)} Sequelize results')

# ANOVA for parametric data (response times)
if keyword == "responseTime":
    print(f'ANOVA results')

    f_stat, p_value = stats.f_oneway(sql_times, prisma_times, sequelize_times)

    print(f'F-Statistics = {f_stat:.3f}')
    print(f'p-value = {p_value:.3f}')

    if p_value < 0.05:
        print(f'Result is statistically significant: {p_value}')
    else:
        print(f'Result is not statistically significant: {p_value}')

# Kruskal-Wallis for non parametric data (memory usage)
if keyword == "memoryUse":
    print(f'Kruskal-Wallis results')

    f_stat, p_value = stats.kruskal(sql_times, prisma_times, sequelize_times)
    print(f'F-Statistics = {f_stat:.3f}')
    print(f'p-value = {p_value:.3f}')

    if p_value < 0.05:
        print(f'Result is statistically significant: {p_value}')
    else:
        print(f'Result is not statistically significant: {p_value}')

if p_value < 0.05 and keyword == "responseTime":
    res = tukey_hsd(sql_times, prisma_times, sequelize_times)

    groups = ['Pure-SQL', 'Prisma', 'Sequelize']
    results_list = []

    for i in range(len(groups)):
        for j in range(i + 1, len(groups)):
            results_list.append({
                "Group 1": groups[i],
                "Group 2": groups[j],
                "p-value": res.pvalue[i][j],
                "Significant": res.pvalue[i, j] < 0.05,
            })

    df = pd.DataFrame(results_list)
    pd.set_option('display.max_columns', None)
    pd.set_option('display.width', 1000)
    print(df)