import React, { Component, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { appendScript } from '../../config/appendScript'
import Chart from 'react-apexcharts'
import adminApi from "../../api/2.0/adminApi"
const DashBoard = () => {
    const [dashboard, setDashboard] = useState({
        totalRoute: 0,
        totalAccount: 0,
        totalQuiz: 0,
        totalExam: 0,
        online: [],
        joinProgress: []
    })
    const [progressChart, setProgressChart] = useState({
        series: [{
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'Product Trends by Month',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          }
        },
    })
    useEffect(async () => {
        const result = await adminApi.getDashboard();
        setDashboard(result);
        setProgressChart({
            ...progressChart,
            series: [{ ...progressChart.series, data: result.joinProgress.map((value) => value.value) }],
            options: {...progressChart.options, xaxis: {...progressChart.options.xaxis, categories: result.joinProgress.map((value) => value.date.slice(0,10))}}
        })
    }, [setDashboard])
    // appendScript("/js/chart-area-demo.js");
    // appendScript("/js/chart-pie-demo.js");
    return (
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                <Link to="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fa fa-download fa-sm text-white-50" /> Generate Report</Link>
            </div>
            <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Số tài khoản</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{dashboard.totalAccount}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa fa-user fa-2x text-gray-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Số bài học</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{dashboard.totalRoute}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa fa-book fa-2x text-gray-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Số bài quiz</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{dashboard.totalQuiz}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa fa-pencil fa-2x text-gray-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Số bài exam</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{dashboard.totalExam}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa fa-pencil-square fa-2x text-gray-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center">
                <div>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Biểu đồ tham gia hệ thống</h6>
                        </div>

                        <div className="card-body">
                            <div className="chart-area">
                                <Chart options={progressChart.options} series={progressChart.series} type="line" height={300} width={1000} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DashBoard;