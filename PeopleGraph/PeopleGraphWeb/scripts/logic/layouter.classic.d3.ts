﻿/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. 
Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
***************************************************************************************** */

///<reference path="shared/layout.ts"/>
///<reference path="layouter.base.d3.ts"/>

declare var d3: any;
declare var $: any;

/**
  * This module contains the implementation of the layouter for the People Bar "classic" type
  */
module DataViz.Chart.D3 {
    "use strict";

    /**
      * The layouter for the People Bar "classic" type
      */
    export class ClassicLayouter extends DataViz.Chart.D3.BaseLayouter {
        private static cyBoardMargin = 8;
        private static cyTitleGap = 24;

        private cyBoardMargin: number;
        private cyTitleGap: number;

        constructor() {
            super();
            this.cyBoardMargin = ClassicLayouter.cyBoardMargin / this.ZoomRatio;
            this.cyTitleGap = ClassicLayouter.cyTitleGap / this.ZoomRatio;
        }

        /**
          * Overriding {@link BaseLayout#layoutExtra}
          */
        public layoutExtra() {
            var root = d3.select(DataViz.Chart.defaultSVGRootId);
            var boardHeight = window.innerHeight || document.body.clientHeight;

            var titleElement = root.select("#title");
            if (titleElement.empty()) {
                return;
            }

            var titleHeight = this.getTitleHeight(titleElement);
            titleElement.attr("y", this.cyBoardMargin + titleHeight);

            var chartBackdrop = root.select("rect#chart-background");
            if (chartBackdrop.empty()) {
                return;
            }

            var chartY = this.cyBoardMargin + titleHeight + this.cyTitleGap;
            var chartHeight = boardHeight - titleHeight - this.cyTitleGap - this.cyBoardMargin * 2;
            chartBackdrop.attr("x", 0)
                .attr("y", chartY)
                .attr("width", "100%")
                .attr("height", chartHeight);

            var chartRoot = root.select(DataViz.Chart.defaultChartRootId);
            if (chartRoot.empty()) {
                return;
            }

            chartRoot.attr("y", chartY)
                .attr("height", chartHeight);

            super.injectPlaceholderForInnerSVG(chartRoot, "100%", chartHeight);
        }
    }
}