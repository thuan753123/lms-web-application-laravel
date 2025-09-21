@extends('admin.layouts.app')


@section('content')
    <section class="section">
        <div class="section-header">
            <h1>{{ trans('admin/main.settings') }}</h1>
            <div class="section-header-breadcrumb">
                <div class="breadcrumb-item active"><a href="#">{{ trans('admin/main.dashboard') }}</a></div>
                <div class="breadcrumb-item">{{ trans('admin/main.settings') }}</div>
            </div>
        </div>

        <div class="section-body">
         
            <div class="row">

                         
                    <div class="col-lg-12">
                      
                        <div class="empty-state mx-auto d-block"  data-width="900" >
                                <img class="img-fluid col-md-6" src="/assets/default/img/lic.svg" alt="image">
                                <h3 class="mt-3">Vui lòng kích hoạt giấy phép của bạn!</h3>
                                <h5 class="lead">
                                Bạn có thể kích hoạt giấy phép bằng cách <strong><a href="mailto:rocketsoftsolutions@gmail.com">liên hệ hỗ trợ</a></strong> hoặc kiểm tra <strong><a href="https://crm.rocket-soft.org">CRM</a></strong>  </h5>                              </p>
                              </div>
                      
                      
                        <div class="card card-large-icons">
                            <div class="card-icon bg-primary text-white">
                                <i class="fas fa-list-alt"></i>
                            </div>
                            <div class="card-body">
                                <h4>Kích hoạt Giấy phép</h4>
                                <p>Bạn có thể lấy file giấy phép từ <strong><a href="https://crm.rocket-soft.org">CRM</a></strong>.</p>
                                <a href="{{ getAdminPanelUrl("/settings/update-app") }}" class="card-cta text-primary">Cài đặt Giấy phép<i class="fas fa-upload"></i></a>
                            </div>
                        </div>
                    </div>
               
            </div>
        </div>
    </section>
@endsection
