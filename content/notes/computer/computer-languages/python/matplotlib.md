---
title: MatPlotLib
date: 2023-10-26
description: 
keywords: 
draft: false
tags:
  - Python
---
**Note:** ChatGPT is pretty good at generating matplotlib plots

```python
import matplotlib.pyplot as plt
import numpy as np
x = np.arange(0, 10, 0.2)
y = np.sin(x)
fig = plt.figure()
ax = fig.add_subplot(111)
ax.plot(x, y)
plt.savefig('pyplot1.png', dpi=300)
```

```python
from pylab import *
import numpy as np
x = arange(0, 10, 0.2)
y = sin(x)
plot(x, y)
savefig('pylab1.png', dpi=300)
```

```python
import matplotlib.pyplot as plt
import seaborn as sb
%matplotlib inline

# inspect data
df.hist();
sns.heatmap(df.corr(), annot=True, fmt='.2f');

# plot bars
plt.bar([1, 2, 3], [224, 620, 425])

# specify x coordinates of tick labels and their labels
plt.xticks([1, 2, 3], ['a', 'b', 'c']);

# plot bars with x tick labels
plt.bar([1, 2, 3], [224, 620, 425], tick_label=['a', 'b', 'c'])
plt.title('Some Title')
plt.xlabel('Some X Label')
plt.ylabel('Some Y Label');

def save_fig(fig_id, tight_layout=True):
    path = os.path.join(PROJECT_ROOT_DIR, "images", CHAPTER_ID, fig_id + ".png")
    print("Saving figure", fig_id)
    if tight_layout:
        plt.tight_layout()
    plt.savefig(path, format='png', dpi=300)

housing.hist(bins=50, figsize=(20,15))
save_fig("attribute_histogram_plots")
plt.show()

country_stats.plot(kind='scatter', x="GDP per capita", y='Life satisfaction')

# plot histogram w/ lines on the confidence intervals
alpha = 5
lower, upper = np.percentile(means, alpha/2), np.percentile(p_diffs, 100-alpha/2)
plt.hist(means);
plt.axvline(x=lower, color='r', linewidth=2);
plt.axvline(x=upper, color='r', linewidth=2);

# visually check for collinearity between variables
sb.pairplot(df['area', 'bedrooms', 'bathrooms'](/notes/))

# basic bar chart
base_color = sb.color_palette()[0]
sb.countplot(data = df, x = 'cat_var', color = base_color)

# bar chart with sorted x-axis
base_color = sb.color_palette()[0]
cat_order = df['cat_var'].value_counts().index
sb.countplot(data = df, x = 'cat_var', color = base_color, order = cat_order)

# horizontal bar chart
base_color = sb.color_palette()[0]
sb.countplot(data = df, y = 'cat_var', color = base_color)

# vertical bars with rotated labels
base_color = sb.color_palette()[0]
sb.countplot(data = df, x = 'cat_var', color = base_color)
plt.xticks(rotation = 90)

# proportional bar chart
# get proportion taken by most common group for derivation
# of tick marks
n_points = df.shape[0]
max_count = df['cat_var'].value_counts().max()
max_prop = max_count / n_points
# generate tick mark locations and names
tick_props = np.arange(0, max_prop, 0.05)
tick_names = ['{:0.2f}'.format(v) for v in tick_props]
# create the plot
base_color = sb.color_palette()[0]
sb.countplot(data = df, x = 'cat_var', color = base_color)
plt.yticks(tick_props * n_points, tick_names)
plt.ylabel('proportion')

# plot counts of missing data
na_counts = df.isna().sum()
base_color = sb.color_palette()[0]
sb.barplot(na_counts.index.values, na_counts, color = base_color)

# pie chart
sorted_counts = df['cat_var'].value_counts()
plt.pie(sorted_counts, labels = sorted_counts.index, startangle = 90,
        counterclock = False);
plt.axis('square')

# doughnut plot
sorted_counts = df['cat_var'].value_counts()
plt.pie(sorted_counts, labels = sorted_counts.index, startangle = 90,
        counterclock = False, wedgeprops = {'width' : 0.4});
plt.axis('square')

# histogram with explicit bin edges
width = 5
bin_edges = np.arange(0, df['num_var'].max()+width, width)
plt.hist(data = df, x = 'num_var', bins = bin_edges)

# similar, but with distribution plot
width = 5
bin_edges = np.arange(0, df['num_var'].max()+width, width)
sb.distplot(df['num_var'], bins = bin_edges)

# subplot functions
plt.subplot()
plt.subplots()
ax = plt.gca()
# or
fig = plt.figure()
fig.add_subplot()
axes = fig.get_axes()

# Get current size
fig_size = plt.rcParams["figure.figsize"]
print("Current size:", fig_size)
fig_size[0] = 12
fig_size[1] = 9
plt.rcParams["figure.figsize"] = fig_size

# histogram for discrete data
width = 1
bin_edges = np.arange(1.5, 12.5+width, width)
plt.hist(die_rolls, bins = bin_edges, rwidth = 0.7)
plt.xticks(np.arange(2, 12+1, 1))

# limit histogram domain with xlim
width = 1
bin_edges = np.arange(0, 35+width, width)
plt.hist(data = df, x = 'skew_var', bins = bin_edges)
plt.xlim(0, 35) # could also be called as plt.xlim((0, 35))

# histogram with log transform
width = .1
bin_edges = 10 ** np.arange(0.8, np.log10(ln_data.max())+width, width)
plt.hist(ln_data, bins = bin_edges)
plt.xscale('log')
tick_locs = [10, 30, 100, 300, 1000, 3000]
plt.xticks(tick_locs, tick_locs)

# scatter plot
plt.scatter(data = df, x = 'num_var1', y = 'num_var2')
sb.regplot(data = df, x = 'num_var1', y = 'num_var2')

# scatter plot with log scale on the y axis
def log_trans(x, inverse = False):
    if not inverse:
        return np.log10(x)
    else:
        return np.power(10, x)
sb.regplot(df['num_var1'], df['num_var2'].apply(log_trans))
tick_locs = [10, 20, 50, 100, 200, 500]
plt.yticks(log_trans(tick_locs), tick_locs)

# overplotting - transparency
plt.scatter(data = df, x = 'disc_var1', y = 'disc_var2', alpha = 1/5)

# overplotting - transparency and jitter
sb.regplot(data = df, x = 'disc_var1', y = 'disc_var2', fit_reg = False,
           x_jitter = 0.2, y_jitter = 0.2, scatter_kws = {'alpha' : 1/3})

# heat map
width = 5
height = 50
bins_x = np.arange(0.5, 10.5+width,width)
bins_y = np.arange(-0.5, 10.5+height,height)
plt.hist2d(data = df, x = 'disc_var1', y = 'disc_var2',
           bins = [bins_x, bins_y], cmap = 'viridis_r', cmin = 0.1)
plt.colorbar();

# in case you want to add counts to the above heat map, use plt.txt()
# loop through the cell counts and add text annotations for each
for i in range(counts.shape[0]):
    for j in range(counts.shape[1]):
        c = counts[i,j]
        if c >= 7: # increase visibility on darkest cells
            plt.text(bins_x[i]+0.5, bins_y[j]+0.5, int(c),
                     ha = 'center', va = 'center', color = 'white')
        elif c > 0:
            plt.text(bins_x[i]+0.5, bins_y[j]+0.5, int(c),
                     ha = 'center', va = 'center', color = 'black')

# violin plot
base_color = sb.color_palette()[0]
sb.violinplot(data = df, x = 'cat_var', y = 'num_var', color = base_color,
              inner = None)

# violin plot showing quartile
base_color = sb.color_palette()[0]
sb.violinplot(data = df, x = 'cat_var', y = 'num_var', color = base_color,
              inner = 'quartile')

# horizontal violin plot
base_color = sb.color_palette()[0]
sb.violinplot(data = df, x = 'num_var', y = 'cat_var', color = base_color,
              inner = None)

# box plot - similar to violin plot
base_color = sb.color_palette()[0]
sb.boxplot(data = df, x = 'cat_var', y = 'num_var', color = base_color))

# clustered bar chart
ax = sb.countplot(data = df, x = 'cat_var1', hue = 'cat_var2')
# optional: reposition the legend
ax.legend(loc = 8, ncol = 3, framealpha = 1, title = 'cat_var2')

# a heatmap showing the same data requires creating a new DataFrame
ct_counts = df.groupby(['cat_var1', 'cat_var2']).size()
ct_counts = ct_counts.reset_index(name = 'count')
ct_counts = ct_counts.pivot(index = 'cat_var2', columns = 'cat_var1', values = 'count')
sb.heatmap(ct_counts, annot = True, fmt = 'd')

# faceting - plot multiple histograms faceted by a categorical variable
g = sb.FacetGrid(data = df, col = 'cat_var')
g.map(plt.hist, "num_var")

# faceting - similar, but forcing the same bin edges for a better comparison
width = 1/3
bin_edges = np.arange(-3, df['num_var'].max()+width, width)
g = sb.FacetGrid(data = df, col = 'cat_var')
g.map(plt.hist, "num_var", bins = bin_edges)

# faceting - sorting and wrapping
group_means = df.groupby(['many_cat_var']).mean()
group_order = group_means.sort_values(['num_var'], ascending = False).index
g = sb.FacetGrid(data = df, col = 'many_cat_var', col_wrap = 5, size = 2,
                 col_order = group_order)
g.map(plt.hist, 'num_var', bins = np.arange(5, 15+1, 1))
g.set_titles('{col_name}')

# bar plot
base_color = sb.color_palette()[0]
sb.barplot(data = df, x = 'cat_var', y = 'num_var', color = base_color)

# point plot
sb.pointplot(data = df, x = 'cat_var', y = 'num_var', linestyles = "")

# line plot with error bars
# set bin edges, compute centers
width = 1/4
xbin_edges = np.arange(0.5, df['num_var1'].max()+width, width)
xbin_centers = (xbin_edges + width/2)[:-1]
# compute statistics in each bin
data_xbins = pd.cut(df['num_var1'], xbin_edges, right = False, include_lowest = True)
y_means = df['num_var2'].groupby(data_xbins).mean()
y_sems = df['num_var2'].groupby(data_xbins).sem()
# plot the summarized data
plt.errorbar(x = xbin_centers, y = y_means, yerr = y_sems)

# swarm plot
base_color = sb.color_palette()[0]
sb.swarmplot(data = df, x = 'cat_var', y = 'num_var', color = base_color)

# rug plot
g = sb.JointGrid(data = df, x = 'num_var1', y = 'num_var2')
g.plot_joint(plt.scatter)
g.plot_marginals(sb.rugplot, height = 0.25)

# strip plot
plt.figure(figsize = [10, 5])
base_color = sb.color_palette()[0]
# left plot: strip plot
plt.subplot(1, 2, 1)
ax1 = sb.stripplot(data = df, x = 'num_var', y = 'cat_var',
                   color = base_color)
# right plot: violin plot with inner strip plot as lines
plt.subplot(1, 2, 2)
sb.violinplot(data = df, x = 'num_var', y = 'cat_var', color = base_color,
             inner = 'stick')

# encoding a third variable by shape
cat_markers = [['A', 'o'],
               ['B', 's']]
for cat, marker in cat_markers:
    df_cat = df[df['cat_var1'] == cat]
    plt.scatter(data = df_cat, x = 'num_var1', y = 'num_var2', marker = marker)
plt.legend(['A','B'])

# encoding a third variable by size
plt.scatter(data = df, x = 'num_var1', y = 'num_var2', s = 'num_var3')
# dummy series for adding legend
sizes = [20, 35, 50]
base_color = sb.color_palette()[0]
legend_obj = []
for s in sizes:
    legend_obj.append(plt.scatter([], [], s = s, color = base_color))
plt.legend(legend_obj, sizes)

# two-color scatter plot
g = sb.FacetGrid(data = df, hue = 'cat_var1', size = 5)
g.map(plt.scatter, 'num_var1', 'num_var2')
g.add_legend()

# multicolor scatter plot
plt.scatter(data = df, x = 'num_var1', y = 'num_var2', c = 'num_var3')
plt.colorbar()

# color palettes
# qualatative palette for nominal-type data
sb.palplot(sb.color_palette(n_colors=9))
# sequential palette for ordinal or numeric data
sb.palplot(sb.color_palette('viridis', 9))
# diverging palette for ordinal or numeric data with meaningful zero or center value
sb.palplot(sb.color_palette('vlag', 9))
```

- Qualitative (all up to 6 colors): 'deep', 'pastel', 'dark', 'muted', 'bright', 'colorblind'  
- Sequential: 'rocket' (white-orange-red-purple-black), 'mako' (mint-green-blue-purple-black)  
- Diverging: 'vlag' (blue-white-red), 'icefire' (blue-black-orange)
- For all of these strings, appending '_r' reverses the palette  

```python
# faceted boxplot
g = sb.FacetGrid(data = df, col = 'cat_var1', size = 4)
g.map(sb.boxplot, 'cat_var2', 'num_var2')

# faceted scatter plot
g = sb.FacetGrid(data = df, col = 'cat_var2', row = 'cat_var1', size = 2.5,
                margin_titles = True)
g.map(plt.scatter, 'num_var1', 'num_var2')

# clustered bar chart
ax = sb.barplot(data = df, x = 'cat_var1', y = 'num_var2', hue = 'cat_var2')
ax.legend(loc = 8, ncol = 3, framealpha = 1, title = 'cat_var2')

# multiple line plot
def mean_poly(x, y, bins = 10, **kwargs):
    """ Custom adapted line plot code. """
    # set bin edges if none or int specified
    if type(bins) == int:
        bins = np.linspace(x.min(), x.max(), bins+1)
    bin_centers = (bin_edges[1:] + bin_edges[:-1]) / 2
    # compute counts
    data_bins = pd.cut(x, bins, right = False,
                       include_lowest = True)
    means = y.groupby(data_bins).mean()
    # create plot
    plt.errorbar(x = bin_centers, y = means, **kwargs)
width = 0.5
bin_edges = np.arange(0.25, df['num_var1'].max()+width, width)
g = sb.FacetGrid(data = df, hue = 'cat_var2', size = 5)
g.map(mean_poly, "num_var1", "num_var2", bins = bin_edges)
g.set_ylabels('mean(num_var2)')
g.add_legend()

# plot matrix
g = sb.PairGrid(data = df, vars = ['num_var1', 'num_var2', 'num_var3'])
g.map_diag(plt.hist)
g.map_offdiag(plt.scatter)

# pair plot
g = sb.PairGrid(data = df, x_vars = ['num_var1', 'num_var2', 'num_var3'],
                y_vars = ['cat_var1','cat_var2'])
g.map(sb.violinplot, inner = 'quartile')

# heatmap of correlation matrix
sb.heatmap(df.corr(), annot = True, fmt = '.2f', cmap = 'vlag_r', center = 0)
```

Another way that you can perform feature engineering is to use the cut function to divide a numeric variable into ordered bins.

```python
# plot dendograms
from scipy.cluster.hierarchy import dendogram, ward, single
from sklearn import datasets
import matplotlib.pyplot as plt
X = datasets.load_iris().data[:10]
linkage_matrix = ward(X)
dendogram(linkage_matrix)
plt.show()

# plot fancy dendogram
import seaborn as sns
sns.clustermap(normalized_X, figsize=(12,18), method=linkage_type, cmap='viridis')
plt.show()
```

---
# References

- [Matplotlib](https://matplotlib.org/)  
- [Colormaps in Matplotlib](https://matplotlib.org/tutorials/colors/colormaps.html)  
- [Choosing color palettes](https://seaborn.pydata.org/tutorial/color_palettes.html)  
- [How The Rainbow Color Map Misleads](https://eagereyes.org/basics/rainbow-color-map)  
- [No more rainbows!](https://agilescientific.com/blog/2017/12/14/no-more-rainbows)  
- [How to choose a color palette for choropleth maps](https://blog.datawrapper.de/how-to-choose-a-color-palette-for-choropleth-maps/) 
