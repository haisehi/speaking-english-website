export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl text-muted-foreground mb-4">
                    Không tìm thấy trang
                </p>
                <p className="text-sm text-muted-foreground">
                    Trang bạn đang tìm kiếm không tồn tại.
                </p>
            </div>
        </div>
    );
}