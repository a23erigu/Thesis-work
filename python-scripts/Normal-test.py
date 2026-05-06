from time import strftime, localtime

import pandas as pd
import json
import matplotlib.pyplot as plt
import matplotlib.mlab as mlab
import scipy.stats as stats
from matplotlib.pyplot import title
from scipy import stats
import os
import numpy as np
from scipy.stats import norm

Title = "ubuntu_prisma"        # Decides the title
figs = "./Figures"

def test_average_normality(path, keyword):
    report_averages = []

    for file in os.listdir(path):
        if file.endswith(".json") and keyword in file.lower():
            file_path = os.path.join(path, file)

            with open(file_path, 'r') as f:
                data = json.load(f)
                res_times = [i['responseTime'] for i in data]

                average = np.mean(res_times)
                report_averages.append(average)

    print(f'Loaded {len(report_averages)} reports')

    print(f"---___ Normality Report for: {keyword} ___---")

    stat, p = stats.normaltest(report_averages)
    print('Statistics = %.3f, p = %.3f' % (stat, p))
    alpha = 0.05
    if p > alpha:
        print('Sample looks gaussian')
    else:
        print('Sample does not look gaussian')

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 5))

    ax1.hist(report_averages, bins=5, color='blue', edgecolor='black')
    ax1.set_title(f'Histogram for {keyword} SQL query averages')
    ax1.set_xlabel(f'Response times (ms)')

    stats.probplot(report_averages, dist='norm', plot=ax2)
    ax2.set_title(f'Probplot for {keyword} SQL query averages')

    plt.tight_layout()
    plt.show()

#test_average_normality('./Reports/Fixed', 'fixed')
#test_average_normality('./Reports/Rand', 'rand')

def test_average_normality_single(file):
    with open(file, 'r') as f:
        data = json.load(f)

    response_times_list = [ex['responseTime'] for ex in data]

    print(f'{response_times_list}')

    percentile_response_times = np.percentile(response_times_list, 95)

    filtered_response_times = [x for x in response_times_list if x <= percentile_response_times]

    print(f'Original Response times: {len(response_times_list)}')
    print(f'Filtered Response times: {len(filtered_response_times)} (bottom 95th percentile)')
    print(f'95th percentile threshold: {percentile_response_times} ms')

    return filtered_response_times

response_times = test_average_normality_single('Reports/floats-report-SQL-get-advanced-1000-17-18-49.json')

result = stats.normaltest(response_times)
print('p = {}\n'.format(result.pvalue))
alpha = 0.05
if result.pvalue > alpha:
    print('Sample looks gaussian')
else:
    print('Sample does not look gaussian')

fig, (x1, x2) = plt.subplots(1, 2, figsize=(10, 5))

x1.hist(response_times, bins=5, density=True, color='blue', edgecolor='black', alpha=0.5)
x1.set_title(f'Histogram for memory usage (SQL)')
x1.set_xlabel(f'Response times (ms)')

stats.probplot(response_times, dist='norm', plot=x2)
x2.set_title(f'probplot for memory usage (SQL)')
x2.set_xlabel(f'Response times (ms)')

plt.tight_layout()
plt.show()

now = strftime("%H-%M-%S", localtime())
#plt.savefig(f'{figs}/{Title}_normality_test_{now}.png')