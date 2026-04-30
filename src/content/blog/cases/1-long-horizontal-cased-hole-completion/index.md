---
title: "Long horizontal cased-hole completion"
slug: "long-horizontal-cased-hole-completion"
description: "WellStim acidizing design of a long horizontal cased-hole completion"
pubDate: 2025-05-20
draft: false
tags: ["cases"]

meta:
  title: "Long horizontal cased-hole completion"
  description: "WellStim acidizing design of a long horizontal cased-hole completion"
  keywords:
    ["acid stimulation", "acidizing", "well productivity", "oil recovery"]
  publicImageName: "./images/case.jpg"
---

import { Columns } from "@/components/columns/index.js";

### The challenge

An acid treatment with acid gel was performed without prior simulation which resulted in lower production and economical improvements than expected. This case shows post-job analysis by simulation in WellStim, including production and NPV optimization.

<Columns center>
  <div slot="left">
    - **Area:** North Europe

    - **Reservoir:** Oil Carbonates

    - **Depth:** MD – 13,100 ft, TVDSS – 8956 ft

    - **Wellbore completion:** slanted well completed with liner

  </div>
  <div slot="right">
    ![3D view of the well configuration](./images/1.jpg)
  </div>
</Columns>

### The solution

The production decline trend for 5 years was set and the design was calculated based on the actual acid treatment schedule.

![Production history match (dots are actual data, lines are calculated data)](./images/2.jpg)

<Columns center>
  <div slot="left">
    The pumping schedule was optimized to increase the efficiency of acid
    treatment. The following relationship charts were produced:
  </div>
  <div slot="right">
    ![Acid volume (x-axis) vs NPV (y-axis)](./images/3.jpg)
  </div>
</Columns>

<Columns>
  <div slot="left">![Injection rate (x) vs Skin (y)](./images/4.jpg)</div>
  <div slot="right">![Acid gel volume (x) vs NPV (y)](./images/5.jpg)</div>
</Columns>

Optimization resulted in the following adjustments:

- Reduce the number of acid and acid gel stages
- Decrease the acid volume to 15,840 gal in two stages (7,920 gal + 7,920 gal)
- Pump acid gel before acid, not after
- Increase the acid gel volume to 15,840 gal in two stages (13,200 gal + 2,640 gal)

### The results

WellStim optimization improved acid coverage, increased oil production and NPV.

<Columns>
  <div slot="left">
    ![Integrated profile with simulation results, actual at the top, optimal at
    the bottom](./images/6.jpg)
  </div>
  <div slot="right">
    <table>
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Actual, not optimized</th>
          <th>Optimal design</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Oil rate, bbl/day </td>
          <td>815</td>
          <td>996</td>
        </tr>
        <tr>
          <td>Skin</td>
          <td>-1.1</td>
          <td>-2.1</td>
        </tr>
        <tr>
          <td>NPV, ‘000 USD</td>
          <td>354</td>
          <td>1532</td>
        </tr>
        <tr>
          <td>Additional oil production over 14 months, ‘000 bbl </td>
          <td>31</td>
          <td>114</td>
        </tr>
        <tr>
          <td>Max wormhole depth, ft </td>
          <td>2.7</td>
          <td>7.0</td>
        </tr>
      </tbody>
    </table>
  </div>
</Columns>

The optimal design was calibrated based on the actual trend of post-stimulation production decline.

<Columns>
  <div slot="left">
    ![Production analysis (trendlines are based on the actual
    data)](./images/7.jpg)
  </div>
  <div slot="right">
    <table>
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Actual, not optimized</th>
          <th>Optimal design</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>NPV, ‘000 USD</td>
          <td>978</td>
          <td>2335</td>
        </tr>
        <tr>
          <td>Additional oil production over 14 months, ‘000 bbl </td>
          <td>73</td>
          <td>170</td>
        </tr>
      </tbody>
    </table>
  </div>
</Columns>
